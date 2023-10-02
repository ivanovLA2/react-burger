import React, {useState} from 'react';
import appStyles from "./app.module.css";
import data from "../../utils/data"
import Modal from "../modal/modal";

export default function App() {

    const state = {storage: data};

    const [isModalActive, setModalActive] = useState(false);

    const handleModalOpen = () => {
        setModalActive(true);
    };
    const handleModalClose = () => {
        setModalActive(false);
    };


    return (
        <div className={appStyles.app}>
            {/*<AppHeader/>*/}
            {/*<main className={appStyles.content}>*/}
            {/*  <BurgerIngredients ingredients={this.state.storage}/>*/}
            {/*  <div className="ml-5 mr-5"></div>*/}
            {/*  <BurgerConstructor ingredients={this.state.storage.filter(e => e.type !== "bun")} bun={this.state.storage.filter(e => e.type === "bun")[0]}/>*/}
            {/*</main>*/}
            <h1>Custom Modal component Demo</h1>
            <button className="button" type="button" onClick={handleModalOpen}>
                open modal
            </button>
            <div>
                {isModalActive && (
                    <Modal title="some modal title" onClose={handleModalClose}>
                        Hello world
                    </Modal>
                )}
            </div>
        </div>
    )
}