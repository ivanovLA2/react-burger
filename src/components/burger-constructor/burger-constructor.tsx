import React, {useRef, useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {RootState} from "../../index";
import {ADD_INGREDIENT, CHANGE_POSITION, createOrder, REMOVE_INGREDIENT} from "../../services/actions/order";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import OrderState from "../../utils/order-state";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../../pages/profile/hooks";
import {v4 as uuidv4} from "uuid";

interface DragItem {
  index: number
  id: string
  type: string
}

const getOrderState = (state: RootState) => state.order as OrderState

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orderItems,
    orderNumber,
    orderRequest,
    orderFailed,
    bun
  } = useSelector(getOrderState);

  const [isModalActive, setIsModalActive] = useState(false);
  const handleModalOpen = () => {
    if (localStorage.getItem("accessToken")) {
      if (bun) {
        let itemsId = orderItems.map(item => item._id);
        itemsId.push(bun._id)
        dispatch(createOrder(itemsId));
        setIsModalActive(true);
      }
    } else {
      navigate("/login")
    }

  };
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: CHANGE_POSITION,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    })
  }

  const [{}, drop] = useDrop({
    accept: "ing",
    collect: monitor => ({}),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        item: { ...item as BurgerIngredientModel,  uniqueId: uuidv4() }
      });
    },
  });

  const handleRemove = (id: string) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      id: id
    });
  }

  return (
      <div className={styles.container} ref={drop}>
        <div className={`${styles.but} pr-8 pt-25`}>
          {bun && (<ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}/>)}
        </div>
        <div className={`${styles.constructor} pt-3 pl-8 pr-5 custom-scroll`}>
          {orderItems.length > 0 ?
              orderItems.map((value, index) =>
                  <IngredientDetails value={value} index={index} key={value.uniqueId} handleRemove={handleRemove}
                                     moveIngredient={moveIngredient}/>
              )
              : (<p className={`${styles.empty} constructor-element `}>Добавьте ингредиент</p>)}


        </div>
        <div className={`${styles.but} pr-8 pt-3`}>
          {bun && (<ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={""}
          />)}
        </div>
        {(orderItems.length > 0 && bun) && (<div className={`${styles.order} pt-10 pb-10`}>
          <p
              className="text text_type_digits-medium pr-1"> {orderItems.reduce((sum, i) => sum + i.price, bun.price * 2)}</p>
          <CurrencyIcon type="primary"/>
          <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4"
                  onClick={handleModalOpen}>
            Оформить заказ
          </Button>
        </div>)}


        <div>
          {isModalActive && (
              <Modal onClose={handleModalClose} title={null}>
                <OrderDetails orderRequest={orderRequest} orderFailed={orderFailed} orderNumber={orderNumber}/>
              </Modal>
          )}
        </div>
      </div>
  );
}

type Props = {
  value: BurgerIngredientModel;
  index: number;
  handleRemove: (id: string) => void,
  moveIngredient: (dragIndex: number, hoverIndex: number) => void
};

function IngredientDetails(props: Props) {
  const {value, handleRemove, index, moveIngredient} = props
  const ref = useRef<HTMLDivElement>(null)
  const [{handlerId}, drop] = useDrop<DragItem,
      void,
      { handlerId: any | null }>({
    accept: 'position',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveIngredient(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const itemId = value._id;

  const [{isDragging}, drag] = useDrag({
    type: 'position',
    item: () => {
      return {itemId, index}
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  return (<div className={styles.constructorElement} ref={ref} data-handler-id={handlerId}>
    <DragIcon type="primary"/>
    <ConstructorElement
        text={value.name}
        price={value.price}
        thumbnail={value.image}
        handleClose={() => handleRemove(value._id)}
    />
  </div>);
}

export default BurgerConstructor;
