const defaultState = {
  query: '',
  activeIndex: -1,
  items: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SEARCH_BY_QUERY':
      return {...state, query: action.query};
    case 'UPDATE_SUGGEST_ITEMS':
      return {...state, items: action.items};
    case 'UPDATE_ACTIVE_INDEX':
      return {...state, activeIndex: action.index};
    default:
      return state;
  }
}