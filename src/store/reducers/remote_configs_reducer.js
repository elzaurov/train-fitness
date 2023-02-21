import {SET_REMOTE_CONFIGS} from '../../actions';
import {
    PLAYER_TYPE_VIMEO,
    DAYS_BETWEEN_REVIEW_REQUESTS,
    POSITION_CONTENT_MAPPING,
    IMAGE_PICKER_OPTIONS,
    PRESCHEDULE_ITEMS,
    INTRODUCTION_METHODS,
    NUMBER_OF_ACTIVITIES_PER_DAY,
    HELP_URL,
    INTRODUCTION_VIDEO_ID,
    ONBOARDING_RECOMMENDATIONS_MAPPINGS,
    INTRO_VIDEO_VARIANT_UNSKIPPABLE,
    PAYWALL_VARIANT_WIDELAB,
    TRIAL_OFFER,
    PREMMIUM_PRODUCT,
} from '../../constants';

const INITIAL_STATE = {
    rio_content: true,
    ux_browse_home: true,
    max_activity_duration: 240,
    help_url: HELP_URL,
    video_player_type: PLAYER_TYPE_VIMEO,
    preschedule_items: PRESCHEDULE_ITEMS,
    introduction_methods: INTRODUCTION_METHODS,
    image_picker_options: IMAGE_PICKER_OPTIONS,
    introduction_video_id: INTRODUCTION_VIDEO_ID,
    position_content_mapping: POSITION_CONTENT_MAPPING,
    number_of_activities_per_day: NUMBER_OF_ACTIVITIES_PER_DAY,
    days_between_review_requests: DAYS_BETWEEN_REVIEW_REQUESTS,
    onboarding_intro_video_behavior: INTRO_VIDEO_VARIANT_UNSKIPPABLE,
    onboarding_recommendations_mappings: ONBOARDING_RECOMMENDATIONS_MAPPINGS,
    onboarding_paywall: PAYWALL_VARIANT_WIDELAB,
    in_app_paywall: PAYWALL_VARIANT_WIDELAB,
    pro_conversion_popup: PAYWALL_VARIANT_WIDELAB,
    trial_offer: TRIAL_OFFER,
    premium_product: PREMMIUM_PRODUCT,
    experiment_5_in_app_paywall: PAYWALL_VARIANT_WIDELAB,
    experiment_6_onboarding_value_video: false,
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_REMOTE_CONFIGS:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};
