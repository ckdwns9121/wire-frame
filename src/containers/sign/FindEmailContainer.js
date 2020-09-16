import React from "react";
import { Paths } from "paths";
import { useHistory } from "react-router-dom";
import styles from "./Find.module.scss";
import Button from "components/button/Button";

const FindEmailContainer = ({ email }) => {
  const history = useHistory();

  const onClickLogin = () => {
    history.push(Paths.ajoonamu.signin);
  };
  const onClickFindPw = () => {
    history.push(Paths.ajoonamu.recovery_pw);
  };
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["title"]}>아이디 찾기</div>
          <div className={styles["box"]}>
            <div className={styles["text"]}>
              찾으시려는 이메일 주소는
              <br />
              <div className={styles["user"]}>dfd11**@naver.com</div>
              입니다.
            </div>
          </div>
          <div className={styles["btn"]}>
            <Button title={"로그인"} toggle={true} onClick={onClickLogin}></Button>
          </div>
          <div className={styles["btn"]}>
            <div className={styles['item']} onClick={onClickFindPw}>
                    비밀번호 찾기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FindEmailContainer;
