import React, {useEffect} from 'react';
import './EditBackDrop.css';
import EditTrade from '../../containers/EditTrade/EditTrade';
import { connect } from 'react-redux';

const EditBackDrop = ({
  handleEditBackDrop,
}) => {
  return (
    <div className="edit_backdrop">
      <div
        className="edit_backdrop__background"
        onClick={handleEditBackDrop}
      ></div>
      <div className="edit_backdrop__content-container">
        <div className="edit_mobile__close-btn-container">
          <button onClick={handleEditBackDrop}>
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
        <div>
        <EditTrade/>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({

});

EditBackDrop.defaultProps = {

};
export default connect(mapStateToProps, { })(EditBackDrop);
