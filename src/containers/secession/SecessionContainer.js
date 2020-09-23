import React,{useState} from 'react';
import styles from './Secession.module.scss';
import Select from '../../components/svg/select/Select';
import { ButtonBase } from '@material-ui/core';

const SecessionContainer = () => {

    const [agree,setAgree] = useState(false);
    const onChangeAgree=()=>{
        setAgree(!agree);
    }

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['context']}>
                    <div className={styles['title']}>
                        회원 탈퇴를 신청하기전에 먼저 확인해주세요.
                    </div>
                    <div className={styles['text']}>
                        탈퇴 후 회원정보 및 이용기록은 모두 삭제되며 다시 복구가
                        불가합니다.<br></br>
                        주문내역 및 결제 내용은 이용약관과 관련법에 의하여
                        보관됩니다.<br></br>
                        동일한 SNS계정과 이메일을 사용한 재가입은 24시간 이내에
                        불가합니다.<br></br>
                    </div>
                    <div className={styles['box']}>
                        <div className={styles['agree']}>
                        회원탈퇴를 신청 하시겠습니까?
                        </div>
                        <div className={styles['check']} onClick={onChangeAgree}>
                        <Select check={agree} />
                            <span>
                            예, 탈퇴를 신청합니다.
                            </span>
                        </div>

                    </div>
                    <div className={styles['btn']}>
                        <ButtonBase className={styles['update']}>
                        회원 탈퇴하기
                        </ButtonBase>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecessionContainer;
