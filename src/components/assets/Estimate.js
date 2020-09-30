import { ButtonBase } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import styled, { css } from 'styled-components';
import { dateToYYYYMMDD } from '../../lib/formatter';

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
    ${props => !props.view && `
        bottom: 100%; left: 0;
        
    `}
    ${props => props.view && `
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0.3);
    `}
`;
const Title = styled.h2`
    text-align: center;
    font-size: 36px;
    margin-top: 0;
`;
const SubTitle = styled.div`
    overflow: hidden;
`;
const CompanyName = styled.p`
    float: left;
`;
const CreatedDate = styled.p`
    margin: 0;
    margin-bottom: 5px;
    float: right;
`;
const Table = styled.table`
    clear: both;
    width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
    box-sizing: border-box;
`;
const TableHead = styled.th`
    min-width: 10px;
    padding: 5px;
    background-color: #bec0bf;
    text-align: left;
    border: solid 1px #aaabaa;
`;
const TableHeadRow = styled.tr`
    background-color: #d3d3d3 !important;
    border-top: solid 2px #000;
    border-bottom: solid 1px #000;
    & ~ tr:nth-child(odd) {
        background-color: #f5f5f5;
    }
`;
const Total = styled.div`
    font-weight: bold;
`;
const Tag = styled.div`
    margin-bottom: 10px;
`;
const TableRow = styled.tr`
    border: solid 1px #aaabaa;
`;
const TableColumn = styled.td`
    border: solid 1px #aaabaa;
    padding: 5px;
    border-top: none;
    border-bottom: none;
    ${(props) =>
        props.value &&
        css`
            text-align: right;
        `}
    ${(props) =>
        props.name &&
        css`
            background-color: #dcdcdc;
            font-weight: bold;
        `}
    ${(props) =>
        props.endpoint &&
        css`
            border-right: solid 1px #000;
        `}
`;
const Cautions = styled.div`
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
    onDownload, company = '아주나무', created = new Date(),
    products = [
        {
            id: 101,
            name: '사과',
            list: [
                { id: 1, item: '과일 도시락', name: '사과', value: 5000 },
                { id: 2, item: '과일 도시락', name: '사과', value: 5000 },
                { id: 3, item: '과일 도시락', name: '사과', value: 5000 },
                { id: 4, item: '과일 도시락', name: '사과', value: 5000 },
                { id: 5, item: '과일 도시락', name: '사과', value: 5000 },
            ],
        },
        {
            id: 102,
            name: '포도',
            list: [
                { id: 6, item: '과일 도시락', name: '포도', value: 7000 },
                { id: 7, item: '과일 도시락', name: '포도', value: 7000 },
                { id: 8, item: '과일 도시락', name: '포도', value: 7000 },
                { id: 9, item: '과일 도시락', name: '포도', value: 7000 },
                { id: 10, item: '과일 도시락', name: '포도', value: 7000 },
                { id: 11, item: '', name: '', value: 0 },
                { id: 12, item: '', name: '', value: 0 },
                { id: 13, item: '', name: '', value: 0 },
            ],
        },
    ],
}) => {
    const ref = useRef(null);
    return (
        <ButtonBase style={{ width: '100%', }} onClick={() => onDownload(ref)}>
            <EstimateArea>
                <Estimate view>
                    <Title>견적서</Title>
                    <SubTitle>
                        <CompanyName>업체명: {company}</CompanyName>
                        <CreatedDate>
                            작성일: {dateToYYYYMMDD(created, '/')}
                        </CreatedDate>
                    </SubTitle>
                    <Table id="estimate-table">
                        <colgroup>
                            <col style={{ width: '100px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '50px' }} />
                            <col style={{ width: '50px' }} />
                            <col style={{}} />
                        </colgroup>
                        <thead>
                            <tr>
                                <TableHead></TableHead>
                                <TableHead>항목</TableHead>
                                <TableHead>이름</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                                <TableHead>총액</TableHead>
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
                                        item,
                                        option_name,
                                        option_price,
                                    } = option;
                                    return (
                                        <TableRow key={itemId}>
                                            <TableColumn name="true"></TableColumn>
                                            <TableColumn
                                                name="true"
                                                endpoint={true}
                                            >
                                                {item}
                                            </TableColumn>
                                            <TableColumn>{option_name}</TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn value={true}>
                                                {option_price}
                                            </TableColumn>
                                        </TableRow>
                                    );
                                });
                                return (
                                    <Fragment key={index}>
                                        <TableHeadRow>
                                            <TableColumn>
                                                {index === 0 && <Tag>이름:</Tag>}
                                                <Total>▼ {item.item_name}</Total>
                                            </TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn value={true}>
                                                {index === 0 && <Tag>소계:</Tag>}
                                                <Total>{item.item_price}</Total>
                                            </TableColumn>
                                        </TableHeadRow>
                                        {components}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Cautions>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Cautions>
                    <Footer>{company} 드림</Footer>
                </Estimate>
                <Estimate id="estimate" ref={ref}>
                    <Title>견적서</Title>
                    <SubTitle>
                        <CompanyName>업체명: {company}</CompanyName>
                        <CreatedDate>
                            작성일: {dateToYYYYMMDD(created, '/')}
                        </CreatedDate>
                    </SubTitle>
                    <Table id="estimate-table">
                        <colgroup>
                            <col style={{ width: '100px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '50px' }} />
                            <col style={{ width: '50px' }} />
                            <col style={{}} />
                        </colgroup>
                        <thead>
                            <tr>
                                <TableHead></TableHead>
                                <TableHead>항목</TableHead>
                                <TableHead>이름</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                                <TableHead>총액</TableHead>
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
                                        item,
                                        option_name,
                                        option_price,
                                    } = option;
                                    return (
                                        <TableRow key={itemId}>
                                            <TableColumn name="true"></TableColumn>
                                            <TableColumn
                                                name="true"
                                                endpoint={true}
                                            >
                                                {item}
                                            </TableColumn>
                                            <TableColumn>{option_name}</TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn value={true}>
                                                {option_price}
                                            </TableColumn>
                                        </TableRow>
                                    );
                                });
                                return (
                                    <Fragment key={index}>
                                        <TableHeadRow>
                                            <TableColumn>
                                                {index === 0 && <Tag>이름:</Tag>}
                                                <Total>▼ {item.item_name}</Total>
                                            </TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn value={true}>
                                                {index === 0 && <Tag>소계:</Tag>}
                                                <Total>{item.item_price}</Total>
                                            </TableColumn>
                                        </TableHeadRow>
                                        {components}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Cautions>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Cautions>
                    <Footer>{company} 드림</Footer>
                </Estimate>
            </EstimateArea>
        </ButtonBase>
    );
};
