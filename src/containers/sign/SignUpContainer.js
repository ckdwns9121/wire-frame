import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Paths } from 'paths'
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import Button from 'components/button/Button';
import Header from '../../components/header/Header';
import CheckBox from 'components/checkbox/CheckBox';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const initialUserState = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    phoneNumber: '',
    authNumber: '',
    agree_marketing: 0

}

const initCheck = {
    allCheck: false,
    check1: false,
    check2: false,
    check3: false,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'UPDATE_USER_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'UPDATE_USER_PASSWORD':
            return {
                ...state,
                password: action.password
            }
        case 'UPDATE_USER_COMPARE':
            return {
                ...state,
                password_confirm: action.password_confirm
            }
        case 'UPDATE_USER_PHONENUMBER':
            return {
                ...state,
                phoneNumber: action.phoneNumber
            }
        case 'UPDATE_USER_AUTHNUMBER':
            return {
                ...state,
                authNumber: action.authNumber
            }
        default:
            return state;

    }
}

const checkReducer = (state, action) => {

    // console.log(action);
    switch (action.type) {
        case 'ALL_CHECK':
            return {
                ...state,
                allCheck: action.check,
            }
        case 'CHECK1':
            return {
                ...state,
                check1: action.check
            }
        case 'CHECK2':
            return {
                ...state,
                check2: action.check
            }
        case 'CHECK3':
            return {
                ...state,
                check3: action.check
            }
        default:
            return state;
    }
}

const SignUpContainer = () => {


    const history = useHistory();

    const [user, dispatchUser] = useReducer(userReducer, initialUserState);

    const { email, password, password_confirm } = user;

    const [compare, setCompare] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [check, dispatchCheck] = useReducer(checkReducer, initCheck);
    const {check1, check2, check3 } = check;

    const updateToggle = useCallback(() => {
        let checkbox = (check1 && check2) ? true : false;
        let userinfo = (email.length !== 0 && compare) ? true : false;
        let result = (checkbox && userinfo) ? true : false;
        setToggle(result);
    }, [check1, check2, email, compare]);


    //패스워드 매칭 체크
    const matchPassword = useCallback(() => {
        if (password.length !== 0 && password_confirm.length !== 0) {
            setCompare(password === password_confirm);
        }
        else {
            setCompare(false);
        }
    }, [password, password_confirm]);


    // 단일 체크박스 변경시 올체크인지 확인
    const onToggleCheck = useCallback(() => {
        if (check1 && check2 && check3) {
            dispatchCheck({ type: 'ALL_CHECK', check: true });
        }
        else if (!check1 || !check2 || !check3) {
            dispatchCheck({ type: 'ALL_CHECK', check: false });
        }
    }, [check1, check2, check3]);



    //모두 체크인지 확인 함수
    const isAllCheck = useCallback(() => {
        if (check1 && check2 && check3) {
            dispatchCheck({ type: 'ALL_CHECK', check: true });
        }
        else if (!check1 || !check2 || !check3) {
            dispatchCheck({ type: 'ALL_CHECK', check: false });
        }
    }, [check1, check2, check3]);

    useEffect(() => {
        updateToggle();
    }, [updateToggle])

    useEffect(() => {
        matchPassword();
    }, [matchPassword])

    useEffect(() => {
        isAllCheck();
    }, [isAllCheck]);

    useEffect(() => {
        onToggleCheck();
    }, [onToggleCheck])




    const updateAllCheck = (e) => {
        dispatchCheck({ type: 'ALL_CHECK', check: e.target.checked });
        dispatchCheck({ type: 'CHECK1', check: e.target.checked });
        dispatchCheck({ type: 'CHECK2', check: e.target.checked });
        dispatchCheck({ type: 'CHECK3', check: e.target.checked });
    };
    const onChangeCheck1 = (e) => {
        dispatchCheck({ type: 'CHECK1', check: e.target.checked });
    };
    const onChangeCheck2 = (e) => {
        dispatchCheck({ type: 'CHECK2', check: e.target.checked });
    };
    const onChangeCheck3 = (e) => {
        dispatchCheck({ type: 'CHECK3', check: e.target.checked });
    };

    const updateEmail = (e) => {
        dispatchUser({ type: 'UPDATE_USER_EMAIL', email: e.target.value });
    };
    const updatePassword = (e) => {
        dispatchUser({ type: 'UPDATE_USER_PASSWORD', password: e.target.value });

    };
    const updateConfirm = (e) => {
        dispatchUser({ type: 'UPDATE_USER_COMPARE', password_confirm: e.target.value });
    };

    const updatePhoneNumber = (e) => {
        dispatchUser({ type: 'UPDATE_USER_PHONENUMBER', phoneNumber: e.target.value });

    };
    const updateAuthNumber = (e) => {
        dispatchUser({ type: 'UPDATE_USER_AUTHNUMBER', authNumber: e.target.value });
    };
    const onClickSignUp = () => {
        console.log("회원가입");
    }

    const confirm = () => {
        if (password.length !== 0 || password_confirm.length !== 0) {
            if (compare) {
                return (
                    "비밀번호가 일치합니다."
                )
            }
            else {
                return (
                    "비밀번호가 불일치합니다."
                )
            }
        }
    }
    return (
        <div className={styles['container']}>
   
            <div className={styles['content']}>
            <div className={styles['title']}>
                회원가입
            </div>
            <div className={styles}>

            </div>
                <SignAuthInput label={"이메일"}inputType={"text"} initValue={user.email} onChange={updateEmail} buttonTitle={"중복검사"} />
                <SignNormalInput label={"비밀번호"}inputType={"password"} initValue={user.password} onChange={updatePassword} />
                <SignNormalInput inputType={"password"} initValue={user.password_confirm} onChange={updateConfirm} />
                <div className={cx('compare', { on: compare, not_view: user.password.length === 0 && user.password_confirm.length === 0 })}>
                        <label>{confirm()}</label>
                    </div>
                <SignAuthInput label={"휴대폰 번호"}inputType={"text"} initValue={user.phoneNumber} onChange={updatePhoneNumber} buttonTitle={"인증번호 발송"} />
                <SignAuthInput inputType={"text"} initValue={user.authNumber} onChange={updateAuthNumber} buttonTitle={"인증하기"} />
                <AcceptContainer
                    {...check}
                    updateAllCheck={updateAllCheck}
                    onChangeCheck1={onChangeCheck1}
                    onChangeCheck2={onChangeCheck2}
                    onChangeCheck3={onChangeCheck3}
                />
                <div className={cx('btn','pd-box')}>
                <Button title={"가입하기"} onClick={onClickSignUp} toggle={toggle} ></Button>
                </div>

            </div>

        </div>
    )
}

const AcceptContainer = (props) => {
    return (
        <div className={cx('agree')}>
            <div className={styles['all']}>
                <CheckBox id={"all"} text={"모두 동의합니다."} check={props.allCheck} onChange={props.updateAllCheck} />
            </div>
            <div className={styles['terms']}>
                <div className={cx('pd-sub-top')}>
                    <div className={styles['chk-box']}>
                    <CheckBox id={"check1"} text={"개인정보처리방침 필수동의"} check={props.check1} onChange={props.onChangeCheck1} />
                    </div>
                    <div className={styles['chk-box']}>
                    <CheckBox id={"check2"} text={"이용약관 필수"} check={props.check2} onChange={props.onChangeCheck2} />
                    </div>
                    <div className={styles['chk-box']}>
                    <CheckBox id={"check3"} text={"이벤트알림 선택동의"} check={props.check3} onChange={props.onChangeCheck3} />
                    </div>
                    <div className={styles['sms']}>
                        <div className={styles['sub-text']}>
                            <label>SMS, 이메일을 통해 할인/이벤트/쿠폰 정보를 </label><br></br>
                            <label>받아보실 수 있습니다. </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignUpContainer;