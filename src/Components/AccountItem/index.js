import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);

function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img alt="Hooa" className={cx('avatar')} src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f73d6053253179a901a476ac120b5d85~c5_100x100.jpeg?x-expires=1677762000&x-signature=h8zXFXCwuKX5K3ji%2B%2Fb0pUZAbN0%3D"/>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
     );
}

export default AccountItem;