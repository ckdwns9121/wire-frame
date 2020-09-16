import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Paths } from "paths";
import { useHistory } from "react-router-dom";
import styles from "./Sign.module.scss";
import SignNormalInput from "components/sign/SignNormalInput";
import Button from "components/button/Button";
import { localLogin, getUserInfo } from "../../api/auth/auth";
import { get_user_info } from "../../store/auth/auth";
import { useDispatch } from "react-redux";
import Header from "../../components/header/Header";
import cn from "classnames/bind";
import {KakaoLogo,NaverLogo,FacebookLogo} from '../../components/svg/sign/social';
import CheckBox from 'components/checkbox/CheckBox';

const cx = cn.bind(styles);

const logo =
  "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const initialUserState = {
  email: "",
  password: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_EMAIL":
      return {
        ...state,
        email: action.email,
      };
    case "UPDATE_USER_PASSWORD":
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
};

const SignInContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, dispatchUser] = useReducer(userReducer, initialUserState);
  const [checked, setChecked] = useState(false);
  useEffect(() => {}, []);

  const updateEmail = useCallback((e) => {
    dispatchUser({ type: "UPDATE_USER_EMAIL", email: e.target.value });
  });
  const updatePassword = useCallback((e) => {
    dispatchUser({ type: "UPDATE_USER_PASSWORD", password: e.target.value });
  });
  const updateChecked = useCallback(() => {
    setChecked(!checked);
    console.log(checked);
  });
  const goToSignup = useCallback(() => {
    history.push(Paths.ajoonamu.signup);
  });
  const onLogin = useCallback(async () => {
    console.log("Gd");
    const { email, password } = user;
    const res = await localLogin(email, password);
    console.log(res);
    if (res.status == 200) {
      sessionStorage.setItem("access_token", res.data.access_token);
      dispatch(get_user_info(res.data.access_token));
      history.push(Paths.index);
    } else {
      alert("이메일 혹은 패스워드를 확인해주세요");
    }
  });
  const goToRecovery = useCallback(() => {
    history.push(Paths.ajoonamu.recovery);
  });

  return (
      <div className={styles["container"]}>
        <div className={cx("content", "sign-in")}>
          <div className={styles["title"]}>로그인</div>
          <div className={styles["user-input"]}>
            <input
              type="text"
              value={user.email}
              onChange={updateEmail}
              placeholder="이메일"
            ></input>
            <input
              type="password"
              value={user.password}
              onChange={updatePassword}
              placeholder="비밀번호"
            ></input>
          </div>
          <div className={styles['util']}>
            <div className={styles['keep-mail']}>
            <CheckBox id={"check1"} text={"이메일 저장하기"} />
            </div>
            <div className={styles['forgot-mail']} onClick={goToRecovery}>
              <label className={styles["sub-text"]}>아이디/비밀번호 찾기</label>
            </div>
          </div>

          <Button title={"로그인"} onClick={onLogin} toggle={true}></Button>
          <Button title={"회원가입"} onClick={goToSignup}></Button>

          <div className={styles["sns-box"]}>
            <div className={styles["social-login"]}>
              <div className={styles["text"]}>간편 로그인</div>
              <div className={styles["line"]}></div>
            </div>

            <div className={styles["social"]}>
              <div className={styles["sns"]}>
                <img src={NaverLogo} alt="naver"></img>
              </div>
              <div className={styles.sns}>
                <img src={KakaoLogo} alt="kakao"></img>
              </div>
              <div className={styles.sns}>
                <img src={FacebookLogo} alt="facebook"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignInContainer;
