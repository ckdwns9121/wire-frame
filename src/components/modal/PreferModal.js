import React from "react";
import styles from "./PreferModal.module.scss";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '../svg/modal/CloseIcon';

import Counter from "components/counter/Counter";

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: 540,
    border: "1px solid red",
  },
}));

const ReserveModal = (props) => {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const classes = useStyles();

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <div className={styles["title-bar"]}>
        <div className={styles["title"]}> 맞춤주문 설정 </div>
        <div className={styles['close']} onClick={props.handleClose}>
                <CloseIcon />
        </div>
      </div>
      <div className={styles["modal-content"]}>
        <div className={styles["label"]}>주문종류</div>
        <div className={styles["modal-input-box"]}>
          <form>
            <select value={props.itemType} onChange={props.onChangeType}>
              <option value="reserve">예약주문</option>
              <option value="delivery">배달주문</option>
            </select>
          </form>
        </div>
        <div className={styles["label"]}>전체예산</div>
        <div className={styles["modal-input-box"]}>
          <input value={props.budget} onChange={props.onChangeBudget}></input>
          <span>원 부터</span>
          <input value={props.budget} onChange={props.onChangeBudget}></input>
          <span>원 까지</span>
        </div>

        <div className={styles["box"]}>
          <div className={styles["label"]}>희망 수량</div>
          <div className={styles["counter"]}>
            <div className={styles['count-box']}>
            <div className={styles["decrement"]}>-</div>
            <div className={styles["value"]}>3</div>
            <div className={styles["increment"]}>+</div>
            </div>
       
          </div>
        </div>
          <div className={styles["btn"]} onClick={props.onClickCustomOrder}>
            설정
          </div>
      </div>
    </Dialog>
  );
};

export default ReserveModal;
