import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import student__img from '../image/student__img.png'

function Main(props){
    return(
        <>
        <div className="main">
            <div className="main__wrapper">
                <header className="header">
                    <Link className="logo header__logo" to={props.linkAbout || ''}/>
                    <div className="header__navigation header__navigation_type_main">
                        <Link className='header__link header__link_type_register' to={props.linkSignUp || ''}>Регистрация</Link>
                        <Link className='header__link header__link_type_login' to={props.linkSignIn || ''}>Войти</Link>
                    </div>
                </header>
                <div className="main__image">
                    <h1 className="main__title-h1">Учебный проект студента факультета Веб-разработки.</h1>
                </div>
            </div>

            <nav className="main__navigation">
                <div className="main__navigation-wrapper">
                    <button className="main__button">О проекте</button>
                    <button className="main__button">Teхнологии</button>
                    <button className="main__button">Студент</button>
                </div>
            </nav>

            <section className="main__about-project">
                <h2 className="main__title-h2">О проекте</h2>
                <div className="main__about-project-wrapper">
                    <h3 className="main__title-h3 main__title-h3_type_about-project">Дипломный проект включал 5 этапов</h3>
                    <p className="main__text main__text_type_about-project">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    <h3 className="main__title-h3 main__title-h3_type_about-project">На выполнение диплома ушло 5 недель</h3>
                    <p className="main__text main__text_type_about-project">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
                <div className="main__ruler-wrapper">
                    <p className="main__ruler main__ruler_color_green">1 неделя</p>                       
                    <p className="main__ruler main__ruler_color_grey">4 недели</p>
                </div>
                <div className="main__ruler-wrapper">
                    <p className="main__ruler-comment main__ruler-comment_type_back">Back-end</p>
                    <p className="main__ruler-comment main__ruler-comment_type_front">Front-end</p>
                </div>
            </section>

            <section className="main__technologies">
                <h2 className="main__title-h2">Технологии</h2>
                <div className="main__technologies-wrapper">
                    <h3 className="main__title-h3 main__title-h3_type_technologies">7 Технологий</h3>
                    <p className="main__text main__text_type_technologies">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                </div>
                <div className="main__technologies-list-wrapper">
                    <div className="main__technologies-list">HTML</div>                       
                    <div className="main__technologies-list">CSS</div>
                    <div className="main__technologies-list">JS</div>                       
                    <div className="main__technologies-list">React</div>
                    <div className="main__technologies-list">Git</div>                       
                    <div className="main__technologies-list">Express.js</div>
                    <div className="main__technologies-list">mongoDB</div>
                </div>
            </section>

            <section className="main__student">
                <h2 className="main__title-h2">Студент</h2>
                <div className="main__student-wrapper">
                    <h3 className="main__title-h3 main__title-h3_type_student">Виталий</h3>
                    <h3 className="main__title-h4 main__title-h4_type_student">Фронтенд-разработчик, 30 лет</h3>
                    <p className="main__text main__text_type_student">
                        Я родился и живу в Саратове, 
                        закончил факультет экономики СГУ. У меня есть жена 
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                        Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                        После того, как прошёл курс по веб-разработке, начал заниматься 
                        фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <div className='main__link-wrapper'>
                        <button className="main__button main__button_type_student">Facebook</button>
                        <button className="main__button main__button_type_student">Github</button>
                    </div>
                    <img className="main__student-img" alt="Фото студента" src={student__img}/>
                </div>
                <div className="main__portfolio-wrapper">
                    <h5 className="main__title-h5 main__title-h5_type_portfolio">Портфолио</h5>
                    <button className="main__button main__button_type_portfolio">Статичный сайт</button>
                    <button className="main__button main__button_type_portfolio">Адаптивный сайт</button>
                    <button className="main__button main__button_type_portfolio">Одностраничное приложение</button>
                </div>
            </section>

        </div>
        <Footer />
    </>
    )
}

export default Main;