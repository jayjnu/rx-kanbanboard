/**
 * Created by zach on 2017. 7. 26..
 */

export const searchByQuery = (query) => ({ type: 'SEARCH_BY_QUERY',  query})

export const updateSuggestList = (listItems) => ({type: 'UPDATE_SUGGEST_ITEMS', items: listItems});
export const updateActiveIndex = (idx) => ({type: 'UPDATE_ACTIVE_INDEX', index: idx});