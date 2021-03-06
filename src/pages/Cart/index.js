import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
    MdRemoveShoppingCart,
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total, CartEmpty } from './styles';

export default function Cart() {
    const dispatch = useDispatch();

    const cart = useSelector(state =>
        state.cart.map(product => ({
            ...product,
            subtotal: formatPrice(product.price * product.amount),
        }))
    );

    const total = useSelector(state =>
        formatPrice(
            state.cart.reduce((totalPrice, product) => {
                return totalPrice + product.price * product.amount;
            }, 0)
        )
    );

    function increment(product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount + 1)
        );
    }

    function decrement(product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount - 1)
        );
    }

    return (
        <Container>
            {cart.length === 0 ? (
                <CartEmpty>
                    <MdRemoveShoppingCart size={100} color="#999" />
                    <h1>Seu carrinho está vazio</h1>
                </CartEmpty>
            ) : (
                <>
                    <ProductTable>
                        <thead>
                            <tr>
                                <th />
                                <th>PRODUTO</th>
                                <th>QUANTIDADE</th>
                                <th>SUBTOTAL</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(product => (
                                <tr>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                        />
                                    </td>
                                    <td>
                                        <strong>{product.title}</strong>
                                        <span>{product.priceFormatted}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    decrement(product)
                                                }
                                            >
                                                <MdRemoveCircleOutline
                                                    size={20}
                                                    color="#7159c1"
                                                />
                                            </button>
                                            <input
                                                type="number"
                                                readOnly
                                                value={product.amount}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    increment(product)
                                                }
                                            >
                                                <MdAddCircleOutline
                                                    size={20}
                                                    color="#7159c1"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <strong>{product.subtotal}</strong>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                dispatch(
                                                    CartActions.removeFromCart(
                                                        product.id
                                                    )
                                                )
                                            }
                                        >
                                            <MdDelete
                                                size={20}
                                                color="#7159c1"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </ProductTable>

                    <footer>
                        <button type="button">Finalizar Pedido</button>
                        <Total>
                            <span>TOTAL:</span>
                            <strong>{total}</strong>
                        </Total>
                    </footer>
                </>
            )}
        </Container>
    );
}
