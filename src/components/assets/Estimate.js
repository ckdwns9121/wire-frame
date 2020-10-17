import { ButtonBase } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import styled from 'styled-components';
import { dateToYYYYMMDD, numberFormat } from '../../lib/formatter';

const EstimateArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 320px;
    background-color: #ebebeb;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    &:hover {        
        &::after {
            opacity: 0
        }
    }
    &::after {
        transition: opacity .2s ease-in-out;
        content: '견적서 미리보기';
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0; top: 0;
        position: absolute;
        color: #222;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.2);
        width: 100%; height: 100%;
    }
`;
const Estimate = styled.div`
    box-sizing: border-box;
    min-width: 800px;
    max-width: 800px;
    position: absolute;
    text-align: left;
    margin: 0 auto;
    padding: 90px;
    background: #fff;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0.3);
`;
const Title = styled.h2`
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
`;
const Table = styled.table`
    width: 100%;
`;
const Cautions = styled.div`
    text-align: center;
    margin: 50px 0;
    line-height: 1.6;
    font-size: 14px;
`;
const Footer = styled.h3`
    text-align: center;
    font-size: 24px;
    margin: 0;
`;

export default ({
    onDownload, company = '샌달',
    dlvCost,
    products = [],
}) => {
    let total = 0;
    const ref = useRef(null);
    return (
        <ButtonBase style={{ width: '100%', }} onClick={() => onDownload(ref)}>
            <EstimateArea>
                <Estimate view>
                    <Title>견적서</Title>
                    <Table id="estimate-table">
                        <thead>
                            <tr>
                                <th>부</th>
                                <th>상품 명</th>
                                <th>규격</th>
                                <th>수량</th>
                                <th>단가</th>
                                <th>금액</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                const {
                                    item,
                                    options,
                                } = product;
                                const components = options.map((option) => {
                                    const {
                                        option_id: itemId,
                                        option_name,
                                        option_price,
                                    } = option;
                                    total += option_price * item.item_quanity;
                                    return (
                                        <tr key={itemId}>
                                            <td></td>
                                            <td name="true"></td>
                                            <td>{option_name}</td>
                                            <td>{item.item_quanity}</td>
                                            <td>{numberFormat(option_price)}</td>
                                            <td value={true}>
                                                {numberFormat(option_price * item.item_quanity)}원
                                            </td>
                                            <td></td>
                                        </tr>
                                    );
                                });
                                total += item.item_price * item.item_quanity;
                                return (
                                    <Fragment key={index}>
                                        <tr>
                                            <td></td>
                                            <td>{item.item_name}</td>
                                            <td></td>
                                            <td>{item.item_quanity}</td>
                                            <td>{numberFormat(item.item_price)}</td>
                                            <td>{numberFormat(item.item_price * item.item_quanity)}원</td>
                                            <td></td>
                                        </tr>
                                        {components}
                                    </Fragment>
                                );
                            })}
                            <tr>
                                <td></td>
                                <td>배달비: {dlvCost}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td value={true}>합계: {numberFormat(total + parseInt(dlvCost))}원</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Cautions>
                        상기와 같이 견적서를 제출합니다.
                    </Cautions>
                    <Footer>{company} 드림</Footer>
                </Estimate>
            </EstimateArea>
        </ButtonBase>
    );
};
