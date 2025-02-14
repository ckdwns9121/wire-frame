export const isEmailForm = (asValue) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
};

export const isCellPhoneForm = (asValue, hyphen = false) => {
    const regExp = hyphen ? /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        : /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
	return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
};

export const isPasswordForm = (asValue) => {
    // const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 8자 이상 영문, 숫자, 특수문자 조합
	return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
};

export const onlyNumber = value => {
    return /[0-9]/.test(value) || value.length > 1;
};
export const onlyNumberListener = e => !onlyNumber(e.key) && e.preventDefault();