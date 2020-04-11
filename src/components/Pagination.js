import React from 'react';
import {PAGINATION} from "../constants";

const Pagination = ({pagination, max_pagination, onPaginateSubmit}) => {
    return (
        <div>
            {pagination !== 0?<button onClick={() => onPaginateSubmit(-1)}>Prev</button>:''}
            {pagination + PAGINATION < max_pagination?<button onClick={() => onPaginateSubmit(1)}>Next</button>:''}
        </div>
    );
};
export default Pagination;
