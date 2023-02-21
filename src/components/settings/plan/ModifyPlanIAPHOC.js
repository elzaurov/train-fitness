import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SafariView from 'react-native-safari-view';
import {NativeModules, Alert} from 'react-native';
import Mixpanel from 'react-native-mixpanel';
import {
  PLANS,
  TERMS_URL,
  POLICY_URL,
  SUBSCRIBE_TO_PLAN,
} from '../../../constants';
import {upgradePlan, upgradePlanData, upgradePlanIAP} from '../../../actions';
import {auth, database} from '../../../config';

const {InAppUtils} = NativeModules;

const ModifyPlanIAPHOCWrapper = (InnerComponent) => {
  class ModifyPlanIAPHOC extends Component {
    state = {
      loading: true,
      yearly: false,
      updating: false,
      updatingPlanId: undefined,
      plans: undefined,
      haveStripe: false,
    };

    listeners = [];

    async componentDidMount() {
      const {plan} = this.props;
      const yearly = plan.id.includes('yearly');
      const productIdentifiers = PLANS.map((p) => p.identifier);

      InAppUtils.loadProducts(productIdentifiers, (error, products) => {
        this.setState({
          yearly,
          loading: false,
          plans: products
            .map((product) => {
              // eslint-disable-next-line no-shadow
              const plan = PLANS.filter(
                (plan) => plan.identifier === product.identifier,
              )[0];
              return {
                ...plan,
                key: plan.key,
                price: product.price,
                currencyCode: product.currencyCode,
                currencySymbol: product.currencySymbol,
              };
            })
            .sort((a, b) => a.key - b.key),
        });
      });
    }

    componentWillUnmount() {
      const {listeners} = this;

      if (listeners && listeners.length) {
        for (const unsub in listeners) {
          unsub();
        }
      }
    }

    handleToggleSwitch = () => {
      this.setState((prevState) => ({
        yearly: !prevState.yearly,
      }));
    };

    handleTermsClick = () => {
      SafariView.show({
        url: TERMS_URL,
      });
    };

    handlePolicyClick = () => {
      SafariView.show({
        url: POLICY_URL,
      });
    };

    handleBackToLogin = () => {
      auth.signOut().then(() => {
        this.props.navigation.navigate('Auth');
      });
    };

    handleSelectPlan = (selectedPlanId) => {
      const {profile} = this.props;
      const isAuth = this.props.route.params?.isAuth;

      this.setState(
        {
          updating: true,
        },
        () => {
          InAppUtils.canMakePayments((canMakePayments) => {
            if (!canMakePayments) {
              this.alertCantMakePayments();
            } else {
              InAppUtils.purchaseProduct(selectedPlanId, (error, response) => {
                if (response && response.productIdentifier) {
                  const currentPlan = PLANS.filter(
                    (p) => p.identifier === selectedPlanId,
                  )[0];
                  const plan = {
                    id: currentPlan.id,
                    name: currentPlan.name,
                  };
                  this.props
                    .upgradePlanIAP({
                      uid: profile.uid,
                      test: !__DEV__,
                      plan,
                      transactionReceipt: response.transactionReceipt,
                    })
                    .then((key) => {
                      this.watchUpdate({key, plan});
                    });
                } else if (!isAuth) {
                  // If the traditional in app purchases failure we search for changes
                  // promoted by the Apple Subscription Status Notification S2S
                  this.watchUpdateStatusNotification();
                } else {
                  this.setState({
                    updating: false,
                  });
                }
              });
            }
          });
        },
      );
    };

    alertCantMakePayments = () => {
      this.setState(
        {
          updating: false,
        },
        () => {
          Alert.alert(
            'Not Allowed',
            'This device is not allowed to make purchases. Please check restrictions on device.',
          );
        },
      );
    };

    watchUpdate = ({key, plan}) => {
      const {navigation, t} = this.props;
      const isAuth = this.props.route.params?.isAuth;
      const url = `/authentication/userWritable/upgrade-plan-iap/${key}`;

      const unsub = database.ref(url).on('value', (snap) => {
        const success = snap.val();

        if (success) {
          this.props.upgradePlanData(plan);

          Mixpanel.trackWithProperties(SUBSCRIBE_TO_PLAN, {
            Plan: plan.name,
          });

          this.setState(
            {
              updatingPlanId: undefined,
              updating: false,
            },
            () => (!isAuth ? navigation.goBack() : navigation.navigate('App')),
          );
        } else {
          this.setState({
            updatingPlanId: undefined,
            updating: false,
          });
        }
      });

      this.listeners.push(unsub);
    };

    watchUpdateStatusNotification = () => {
      const {navigation, t, profile} = this.props;
      const url = `/authentication/userReadable/plan/${profile.uid}`;

      const unsub = database.ref(url).on('value', () => {
        this.setState(
          {
            updating: false,
          },
          () => {
            this.updatedAlert();
            navigation.goBack();
          },
        );
      });

      this.listeners.push(unsub);
    };

    updatedAlert = () => {
      Alert.alert(
        'Subscription status',
        'Changing plans may take a few minutes.',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onSelectPlan={this.handleSelectPlan}
          onToggleSwitch={this.handleToggleSwitch}
          onTermsClick={this.handleTermsClick}
          onPolicyClick={this.handlePolicyClick}
          onBackToLogin={this.handleBackToLogin}
        />
      );
    }
  }

  ModifyPlanIAPHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    route: PropTypes.object.isRequired,
    plan: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    upgradePlan: PropTypes.func.isRequired,
    upgradePlanIAP: PropTypes.func.isRequired,
    upgradePlanData: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  function mapStateToProps({plan, profile}) {
    return {plan, profile};
  }

  return connect(mapStateToProps, {
    upgradePlan,
    upgradePlanData,
    upgradePlanIAP,
  })(ModifyPlanIAPHOC);
};

export default ModifyPlanIAPHOCWrapper;
