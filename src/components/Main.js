import React from 'react';
import Footer from './Footer';
import student__img from '../image/student__img.png'
import Header from './Header';

function Main(props){
    return(
        <>
        <div className="main">
            <div className="main__wrapper">
                <Header 
                    isOpen={props.isOpen}
                    menuOpen={props.menuOpen}
                    onClose={props.onClose}
                    loggedIn={props.loggedIn}
                    linkSignUp={props.linkSignUp}
                    linkSignIn={props.linkSignIn}
                    linkMovies={props.linkMovies}
                    linkProfile={props.linkProfile}
                    linkSavedMovies={props.linkSavedMovies}/>
                <div className="main__image">
                    <h1 className="main__title-h1">Учебный проект студента факультета Веб-разработки.</h1>
                </div>
            </div>

            <nav className="main__navigation">
                <div className="main__navigation-wrapper">
                    <a href='#about' className="main__button">О проекте</a>
                    <a href='#technologies' className="main__button">Teхнологии</a>
                    <a href='#student' className="main__button">Студент</a>
                </div>
            </nav>

            <section className="main__about-project" id={'about'}>
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

            <section className="main__technologies" id={'technologies'}>
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

            <section className="main__student" id={'student'}>
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
                    <a className="main__button main__button_type_portfolio" href="https://github.com/Sepsimus/learn_branches" target="_blank">Статичный сайт</a>
                    <a className="main__button main__button_type_portfolio" href="https://github.com/Sepsimus/russian-travel" target="_blank">Адаптивный сайт</a>
                    <a className="main__button main__button_type_portfolio" href="https://github.com/Sepsimus/mesto" target="_blank">Одностраничное приложение</a>
                </div>
            </section>

        </div>
        <Footer />
    </>
    )
}

export default Main;