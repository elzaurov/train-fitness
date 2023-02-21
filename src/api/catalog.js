export default (instance) => ({
  getTemplate: (matchers) => instance.get('/catalog', {params: matchers}),
});
