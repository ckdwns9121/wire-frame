import React, { useState, useCallback, useEffect } from "react";
import styles from "./Find.module.scss";
import TitleBar from "components/titlebar/TitleBar";
import classNames from "classnames/bind";
import SignNormalInput from "components/sign/SignNormalInput";
import Button from "components/button/Button";

const cx = classNames.bind(styles);

const FindPasswordContainer = () => {
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [compare, setCompare] = useState(false);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  //패스워드 매칭 체크
  const matchPassword = useCallback(() => {
    if (password.length !== 0 && password_confirm.length !== 0) {
      setCompare(password === password_confirm);
    } else {
      setCompare(false);
    }
  }, [password, password_confirm]);

  const confirm = () => {
    if (password.length !== 0 || password_confirm.length !== 0) {
      if (compare) {
        return "비밀번호가 일치합니다.";
      } else {
        return "비밀번호가 불일치합니다.";
      }
    }
  };
  const onClickChangePassword = () => {
    console.log("비번 변경");
  };

  useEffect(() => {
    matchPassword();
  }, [matchPassword]);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["title"]}>비밀번호 찾기</div>
          <div className={cx("box",'pw')}>
            <div className={styles["text"]}>
              인증이 완료되어 비밀번호를 재설정 합니다.
              <br />
              비밀번호를 잊어버리지 않게 주의하세요!
            </div>
          </div>
          <div className={styles["input"]}>
            <input className={styles['change-input']} placeholder="새로운 비밀번호" value={password} onChange={onChangePassword}></input>
            <input className={styles['change-input']}placeholder="새로운 비밀번호 확인" value={password_confirm} onChange={onChangePasswordConfirm}></input>
            <div
              className={cx("compare", {
                on: compare,
                not_view:
                  password.length === 0 && password_confirm.length === 0,
              })}
            >
              <label>{confirm()}</label>
            </div>
          </div>
          <Button
          title={"비밀번호 변경후 로그인"}
          onClick={onClickChangePassword}
          toggle={compare}
        ></Button>
        </div>

      </div>
    </>
  );
};
export default FindPasswordContainer;
