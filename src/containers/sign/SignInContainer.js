import React, { useState, useEffect, useCallback, useReducer } from 'react';
import useInputs from '../../hooks/useInputs';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './Sign.module.scss';
import Button from 'components/button/Button';
import { localLogin } from '../../api/auth/auth';
import { get_user_info } from '../../store/auth/auth';
import { useDispatch } from 'react-redux';
import cn from 'classnames/bind';
import {
    KakaoLogo,
    NaverLogo,
    FacebookLogo,
} from '../../components/svg/sign/social';
import CheckBox from 'components/checkbox/CheckBox';

const cx = cn.bind(styles);

const initialUserState = {
    email: '',
    password: '',
};

const SignInContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [user_state, onChangeUserInput] = useInputs(initialUserState);
    const { email, password } = user_state;

    const [checked, setChecked] = useState(false);

    const onChangeChecked = (e) => {
        setChecked(e.target.checked);
    };
    const onClickSignUp = () => {
        history.push(Paths.ajoonamu.signup);
    };

    const onClickRecovery = () => {
        history.push(Paths.ajoonamu.recovery);
    };

    const onClickLogin = useCallback(async () => {
        const res = await localLogin(email, password);
        if (res.status == 200) {
            sessionStorage.setItem('access_token', res.data.access_token);
            dispatch(get_user_info(res.data.access_token));
            history.push(Paths.index);
        } else {
            alert('이메일 혹은 패스워드를 확인해주세요');
        }
    }, [email, password]);

    return (
        <div className={styles['container']}>
            <div className={cx('content', 'sign-in')}>
                <div className={styles['title']}>로그인</div>
                <div className={styles['user-input']}>
                    <input
                        type="text"
                        name={'email'}
                        value={email}
                        onChange={onChangeUserInput}
                        placeholder="이메일"
                    />
                    <input
                        type="password"
                        name={'password'}
                        value={password}
                        onChange={onChangeUserInput}
                        placeholder="비밀번호"
                    />
                </div>
                <div className={styles['util']}>
                    <div className={styles['keep-mail']}>
                        <CheckBox
                            id={'check1'}
                            text={'이메일 저장하기'}
                            onChange={onChangeChecked}
                            check={checked}
                        />
                    </div>
                    <div
                        className={styles['forgot-mail']}
                        onClick={onClickRecovery}
                    >
                        <label className={styles['sub-text']}>
                            아이디/비밀번호 찾기
                        </label>
                    </div>
                </div>

                <Button
                    title={'로그인'}
                    onClick={onClickLogin}
                    toggle={true}
                ></Button>
                <Button title={'회원가입'} onClick={onClickSignUp}></Button>

                <div className={styles['sns-box']}>
                    <div className={styles['social-login']}>
                        <div className={styles['text']}>간편 로그인</div>
                        <div className={styles['line']}></div>
                    </div>

                    <div className={styles['social']}>
                        <div className={styles['sns']}>
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
