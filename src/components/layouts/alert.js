import { useContext, useState } from "react";
import classes from "./alert.module.css";
import Modal from "./Modal";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";

const Cart = (props) => {
  return (
    <Modal>
      <div>
        <div className="close" onClick={props.onpress}>
          <CloseOutlined />
        </div>
        <div>
          <p className={classes.paragrap}>
            You're about submit <br /> these details for validation
          </p>

          <Checkbox.Group style={{ textAlign: "center" }}>
            <Checkbox id="terms" value="accept terms">
              These details have been self attested and confirmed
            </Checkbox>
          </Checkbox.Group>
        </div>
        <div>
          <Link to="/soSubmit">
            <button className={classes.button}>Submit</button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
export default Cart;
