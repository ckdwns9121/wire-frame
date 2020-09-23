import React, { useCallback, useState } from 'react';
import classnames from 'classnames/bind';

import styles from './StickerModal.module.scss';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '../svg/modal/CloseIcon';
import PhraseTemplateList from '../assets/PhraseTemplateList';
import { requestPostPhraseSerive } from '../../api/order/sticker';

import { ButtonBase } from '@material-ui/core';

const cn = classnames.bind(styles);

const InputLogo = ({ handleChange }) => {
    const [file, setFile] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0].name);
            handleChange(e.target.files[0]);
        }
    };
    return (
        <div className={styles['input-area']}>
            <ButtonBase className={cn('input-logo', 'input-box')}>
                <input
                    id="import-logo"
                    className={styles['filebox']}
                    type="file"
                    onChange={handleImageChange}
                />
                <label
                    className={styles['filelabel']}
                    htmlFor="import-logo"
                >
                    <div className={styles['text']}>이미지 찾아보기</div>
                </label>
            </ButtonBase>
            <p className={styles['filename']}>{file}</p>
        </div>
    );
};
const InputPhrase = ({ handleChange }) => {
    return (
        <div className={styles['input-area']}>
            <textarea
                className={cn('input-phrase', 'input-box')}
                onChange={handleChange}
            />
        </div>
    );
};
const InputPreview = () => {
    return (
        <div className={styles['preview']}>
            <ButtonBase
                className={cn('input-preview', 'input-box')}
            ></ButtonBase>
        </div>
    );
};
const GuideTemplate = ({ title, children, className }) => (
    <div className={cn('guide', className)}>
        <h3 className={styles['label']}>{title}</h3>
        <div className={styles['content']}>{children}</div>
    </div>
);

const StickerModal = (props) => {
    const [template, setTemplate] = useState(0);
    const [logo, setLogo] = useState(null);
    const [phrase, setPhrase] = useState('');

    const TemplateList = [
        {
            class: 'template',
            title: '템플릿을 선택해주세요.',
            content: (
                <PhraseTemplateList
                    template={template}
                    handleChange={setTemplate}
                />
            ),
        },
        {
            class: 'logo',
            title: '로고 이미지를 선택해주세요.',
            content: <InputLogo handleChange={setLogo} />,
        },
        {
            class: 'phrase',
            title: '입력하실 문구를 입력하세요.',
            content: <InputPhrase phrase={phrase} handleChange={setPhrase} />,
        },
        {
            class: 'preview',
            title: '미리보기',
            content: (
                <InputPreview template={template} logo={logo} phrase={phrase} />
            ),
        },
    ];

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className={styles['dialog']}
        >
            <div className={styles['title-bar']}>
                <div className={styles['title']}>문구 서비스 신청</div>
                <div className={styles['close']} onClick={props.handleClose}>
                    <CloseIcon />
                </div>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['container']}>
                    {TemplateList.map((template, index) => (
                        <GuideTemplate
                            key={index}
                            title={template.title}
                            className={template.class}
                        >
                            {template.content}
                        </GuideTemplate>
                    ))}
                </div>
                <div className={styles['confirm']}>
                    <ButtonBase
                        className={styles['btn']}
                        onClick={props.onClickCustomOrder}
                    >
                        신청하기
                    </ButtonBase>
                </div>
            </div>
        </Dialog>
    );
};

export default StickerModal;
