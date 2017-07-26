import { connect } from 'react-redux';

import Suggest from '../components/Suggest';


const mapStateToProps = (state) => ({ query: state.suggestApp.query, items: state.suggestApp.items, activeIndex: state.suggestApp.activeIndex });
const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};
export default connect(mapStateToProps, mapDispatchToProps)(Suggest)