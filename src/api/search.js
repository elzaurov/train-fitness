export default (instance) => ({
  searchActivities: (search) => instance.get(`/activities?search=${search}`),
});
