/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

 'use strict';

 import { logger, database, changePanel } from '../utils.js';
 
 const { Launch, Status } = require('minecraft-java-core');
 const { ipcRenderer } = require('electron');
 const launch = new Launch();
 const pkg = require('../package.json');
 
 const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? `${process.env.HOME}/Library/Application Support` : process.env.HOME)
 
 class Home {
     static id = "home";
     async init(config, news) {
         this.news = await news
     }
 
     async initNews() {
         let news = document.querySelector('.news-list');
         if (this.news) {
             if (!this.news.length) {
                 let blockNews = document.createElement('div');
                 blockNews.classList.add('news-block', 'opacity-1');
                 blockNews.innerHTML = `
                     <div class="news-header">
                         <div class="header-text">
                             <div class="title">Aucun news n'ai actuellement disponible.</div>
                         </div>
                     </div>
                     <div class="news-content">
                         <div class="bbWrapper">
                             <p>Vous pourrez suivre ici toutes les news relative au serveur.</p>
                         </div>
                     </div>`
                 news.appendChild(blockNews);
             } else {
                 for (let News of this.news) {
                     let date = await this.getdate(News.publish_date)
                     let blockNews = document.createElement('div');
                     blockNews.classList.add('news-block');
                     blockNews.innerHTML = `
                         <div class="news-header">
                             <div class="header-text">
                                 <div class="title">${News.title}</div>
                             </div>
                             <div class="date">
                                 <div class="day">${date.day}</div>
                                 <div class="month">${date.month}</div>
                             </div>
                         </div>
                         <div class="news-content">
                             <div class="bbWrapper">
                                 <p>${News.content.replace(/\n/g, '</br>')}</p>
                                 <p class="news-author">Auteur,<span> ${News.author}</span></p>
                             </div>
                         </div>`
                     news.appendChild(blockNews);
                 }
             }
         } else {
             let blockNews = document.createElement('div');
             blockNews.classList.add('news-block', 'opacity-1');
             blockNews.innerHTML = `
                 <div class="news-header">
                     <div class="header-text">
                         <div class="title">Error.</div>
                     </div>
                 </div>
                 <div class="news-content">
                     <div class="bbWrapper">
                         <p>Impossible de contacter le serveur des news.</br>Merci de vérifier votre configuration.</p>
                     </div>
                 </div>`
             // news.appendChild(blockNews);
         }
     }
 
     initBtn() {
         document.querySelector('.settings-btn').addEventListener('click', () => {
             changePanel('settings');
         });
     }
 
     initBtn() {
        document.querySelector('.news-pages').addEventListener('click', () => {
            changePanel('new');
        });
    }
 
    initBtn() {
       document.querySelector('.home-button').addEventListener('click', () => {
           changePanel('home');
       });
    }
     async getdate(e) {
         let date = new Date(e)
         let year = date.getFullYear()
         let month = date.getMonth() + 1
         let day = date.getDate()
         let allMonth = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
         return { year: year, month: allMonth[month - 1], day: day }
     }
 }
 export default Home;