import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/Components/Popper';
import AccountItem from '~/Components/AccountItem';
import { useDebounce } from '~/Hooks';
import * as searchServices from '~/apiServices/searchService';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 700);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);

            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleOnChangeInput = (e) => {
        const searchValue = e.target.value;

        if (searchValue.startsWith(' ')) {
            if (searchValue != null) {
                const position = parseInt(searchValue.length);
                inputRef.current.setSelectionRange(position, position);
            }
            return;
        } else {
            setSearchValue(e.target.value);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setSearchResult([]);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        
        // <div>
            <HeadlessTippy
                interactive
                appendTo={() => document.body}
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => {
                                return <AccountItem key={result.id} data={result} />;
                            })}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        ref={inputRef}
                        onChange={handleOnChangeInput}
                        onFocus={() => setShowResult(true)}
                    />
    
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
    
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        // </div>
    );
}

export default Search;
