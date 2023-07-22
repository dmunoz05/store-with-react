/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/solid'
import './styles.css';

const OrderCard = props => {

    const { id, title, imageUrl, price, handleDelete } = props;
    let renderXMarkIcon;
    if (handleDelete) {
        renderXMarkIcon = <XMarkIcon className='h-6 w-6 text-black cursor-pointer'
            onClick={() => handleDelete(id)}>
        </XMarkIcon>
    }

    return (
        <div className='flex justify-between items-center mb-3'>
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20 rounded-lg'>
                    <img className='w-full h-full object-cover rounded-lg' src={imageUrl} alt={title} />
                </figure>
                <p className='text-sm font-light'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-lg font-medium'>$ {price}</p>
                {renderXMarkIcon}
            </div>
        </div>
    )
}

export default OrderCard;