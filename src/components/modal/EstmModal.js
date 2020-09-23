import React, { useCallback, useReducer, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from './Asset.module.scss';
import Dialog from '@material-ui/core/Dialog';
import { ButtonBase } from '@material-ui/core';
import { requestPostEstimate } from '../../api/order/estimate';
import CloseIcon from '../svg/modal/CloseIcon';
import Estimate from '../assets/Estimate';

const reducer = (state, action) => ({
    ...state,
    [action.name]: action.value,
});

const EstmModal = (props) => {
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const [state, dispatch] = useReducer(reducer, {
        receiver: '박철현',
        receiver_email: 'ghooz1204@naver.com',
    });
    const [estmFile, setEstmFile] = useState(null);

    const onStateChange = useCallback((e) => dispatch(e.target), []);
    const sendEstimate = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        const { receiver, receiver_email } = state;
        requestPostEstimate(token, {
            estm_email: receiver_email,
            estm_username: receiver,
            estm_file: estmFile,
        });
    }, [estmFile, state]);

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
            setEstmFile(makeFile);
        });
    };

    return (
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
                    <input />
                </div>
                <div className={styles['modal-input-box']}>
                    <div className={styles['label']}>받을 이메일 주소</div>
                    <input />
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
    );
};

export default EstmModal;
