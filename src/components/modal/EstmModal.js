import React, { useCallback, useReducer, useState } from 'react';
import {Paths} from 'paths';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from './Asset.module.scss';
import Dialog from '@material-ui/core/Dialog';
import { ButtonBase } from '@material-ui/core';
import { requestPostEstimate } from '../../api/order/estimate';
import CloseIcon from '../svg/modal/CloseIcon';
import Estimate from '../assets/Estimate';
import Loading from '../assets/Loading';
import { isEmailForm } from '../../lib/formatChecker';
import { useModal } from '../../hooks/useModal';

const reducer = (state, action) => ({
    ...state,
    [action.name]: action.value,
});

const EstmModal = (props) => {
    const openModal = useModal();

    const [loading, setLoading] = useState(false);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const [state, dispatch] = useReducer(reducer, {
        receiver: '',
        receiver_email: '',
    });
    const [estmFile, setEstmFile] = useState(null);

    const onStateChange = useCallback((e) => dispatch(e.target), []);
    const sendEstimate = useCallback(async () => {
        if (estmFile) {
            if (isEmailForm(state.receiver_email)) {
                const token = sessionStorage.getItem('access_token');
                setLoading(true);
                try {
                    const { receiver, receiver_email } = state;
                    const res = await requestPostEstimate(token, {
                        estm_email: receiver_email,
                        estm_username: receiver,
                        estm_file: estmFile,
                    });
                    console.log(res);
                    if (res.data.msg === "성공") {
                        openModal('성공적으로 전송되었습니다!', '이메일을 확인해 주세요!');    
                    } else {
                        openModal('전송이 실패했습니다.', '다시 시도해 주세요.');
                    }
                } catch (e) {
                    openModal('예기치 못한 에러가 발생했습니다!', '다시 시도해 주세요.');
                }
                setLoading(false);
            } else {
                openModal('잘못된 이메일 형식입니다.', '이메일 형식을 확인해 주세요.');
            }
        } else {
            openModal('미리보기 시도 후 전송하셔야 합니다.', '견적서를 한 번 확인 후에 시도해주세요.');
        }
    }, [estmFile, state, openModal]);

    const onDownload = (ref) => {
        let position = 0;
        const doc = new jsPDF('p', 'mm');

        html2canvas(ref.current).then((canvas) => {
            const imageData = canvas.toDataURL('image/png');
            const imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
            const pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            doc.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(
                    imageData,
                    'PNG',
                    0,
                    position,
                    imgWidth,
                    imgHeight,
                );
                heightLeft -= pageHeight;
            }
            const blob = doc.output('blob');
            const makeFile = new File([blob], '아주나무 견적서.pdf', {
                type: blob.type,
            });
            window.open(doc.output('bloburl'));
            setEstmFile(makeFile);
        });
    };

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <div className={styles['title-bar']}>
                    <div className={styles['title']}>견적서 발송</div>
                    <div className={styles['close']} onClick={props.handleClose}>
                        <CloseIcon />
                    </div>
                </div>
                <div className={styles['modal-content']}>
                    <div className={styles['modal-input-box']}>
                        <div className={styles['label']}>수신자</div>
                        <input type="text" name="receiver" value={state.receiver} onChange={onStateChange}/>
                    </div>
                    <div className={styles['modal-input-box']}>
                        <div className={styles['label']}>받을 이메일 주소</div>
                        <input type="text" name="receiver_email" value={state.receiver_email} onChange={onStateChange}/>
                    </div>
                    <ButtonBase className={styles['estimate']}>
                        <Estimate onDownload={onDownload} />
                    </ButtonBase>
                    <div className={styles['box']}>
                        <ButtonBase className={styles['btn']} onClick={props.order}>
                            건너뛰기
                        </ButtonBase>
                        <ButtonBase className={styles['btn'] + ' ' + styles['active']} onClick={sendEstimate}>견적서발송</ButtonBase>
                    </div>
                </div>
            </Dialog>
            <Loading open={loading} />
        </>
    );
};

export default EstmModal;
