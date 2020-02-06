import React from 'react';
import PropTypes from 'prop-types';
import { trimStr } from '../Utilities/helpers';
import styled from 'styled-components';
import LoadingState from '../Components/LoadingState';
import NoData from '../Components/NoData';

import {
    Badge,
    DataList,
    DataListItem as PFDataListItem,
    DataListCell as PFDataListCell
} from '@patternfly/react-core';

const DataListCell = styled(PFDataListCell)`
    --pf-c-data-list__cell-cell--MarginRight: 0;
`;

const DataListItem = styled(PFDataListItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 15px;
`;

const DataCellEnd = styled(DataListCell)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ModulesList = ({ modules, isLoading }) => (
    <DataList aria-label="Top Modules" style={ {
        maxHeight: '400px',
        overflow: 'auto'
    } }>
        <DataListItem aria-labelledby="top-modules-header">
            <DataListCell>
                <h3>Top Modules</h3>
            </DataListCell>
            <DataCellEnd>
                <h3>
                    <strong>Usage</strong>
                </h3>
            </DataCellEnd>
        </DataListItem>
        { isLoading && (
            <PFDataListItem
                aria-labelledby="modules-loading"
                key={ isLoading }
            >
                <PFDataListCell>
                    <LoadingState />
                </PFDataListCell>
            </PFDataListItem>
        ) }
        { !isLoading && modules.length <= 0 && (
            <PFDataListItem
                aria-labelledby="modules-no-data"
                key={ isLoading }
            >
                <PFDataListCell>
                    <NoData />

                </PFDataListCell>
            </PFDataListItem>
        ) }
        { modules.filter(module => module.module !== null).map(({ module, count }) => (
            <DataListItem aria-labelledby="top-modules-detail" key={ module }>
                <DataListCell>
                    <span>{ trimStr(module) }</span>
                </DataListCell>
                <DataCellEnd>
                    <Badge isRead>{ count }</Badge>
                </DataCellEnd>
            </DataListItem>
        )) }
    </DataList>
);

ModulesList.propTypes = {
    modules: PropTypes.array,
    isLoading: PropTypes.bool
};

export default ModulesList;
