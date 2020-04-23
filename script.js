//controller
var controller = (function() {
   var cou = {
      name: [],
      flag: [],
      time: [],
      id: []
   }
   var Api = function() {
         fetch('https://restcountries.eu/rest/v2/region/africa')
         .then(function(result) {
            return result.json();
         })
         .then(function(data) {
            for (var i = 0; i < data.length; i++) {
               cou.flag.push(data[i].flag);
               cou.name.push(data[i].name);
               cou.time.push(data[i].timezones[0]);
               cou.id.push(i);
            }
         })
         .catch(function(error) {
            alert(error);
         });
      };
   
   return {
      list: function(){
         return Api();
      },
      country: function(){
         return cou;
      }
   };
})();


// ui controller 
var UIcontroller = (function() {
   var DOM = {
      search: '#searchButton',
      list: '#list',
      searchBar: '#search',
      adv: '#adv',
      container: '.container',
      text: '.text',
      input: '#input',
      countryList: '.country-list',
      text2: '.text2',
      dot: '#dot',
      load: '.loader',
      data: '.data',
      body: 'body',
      img: '#img',
      msg1: '.msg1',
      msg2: '.msg2',
      time: '.time',
      grt: '.greet'
   };
   
   return {
      getDOM: function() {
         return DOM;
      },
      listClick: function() {
         var search = document.querySelector(DOM.searchBar);
         var adv = document.querySelector(DOM.adv);
         var container = document.querySelector(DOM.container);
         var text = document.querySelector(DOM.text);
         var text2 = document.querySelector(DOM.text2);
         var input = document.querySelector(DOM.input);
         var data = document.querySelector(DOM.data);
         var body = document.querySelector(DOM.body);
         
         if (adv.style.display === 'none') {
            body.style.backgroundColor = '#0C070C';
            data.style.display = 'none';
            adv.style.display = 'block';
            adv.style.animation = 'fade 1s';
            search.style.backgroundColor = '#B29A2B';
            container.style.color = '#FFFFFF';
            text.style.display = 'none';
            text2.style.display = 'none';
            input.classList.remove('input');
            input.classList.add('white');
         } else {
            adv.style.display = 'none';
            search.style.backgroundColor = 'inherit';
            container.style.color = 'inherit';
            text.style.display = 'block';
            input.classList.remove('white');
            input.classList.add('input');
         }
      },
      addCountry: function(name, flag, id) {
         var ol = document.querySelector(DOM.countryList);
         var markup = '<li><button id="button-'+ id + '"><span>' + name + '</span><img class="flag" src="' + flag + '"></button></li>';
         ol.insertAdjacentHTML('beforeend', markup);
      },
      countryClick: function(id) {
         var input = document.querySelector(DOM.input);
         var list = document.querySelector(DOM.list);
         var search = document.querySelector(DOM.searchBar);
         var adv = document.querySelector(DOM.adv);
         var container = document.querySelector(DOM.container);
         var text2 = document.querySelector(DOM.text2);
         
         if (event.target.id.includes(id)) {
            input.value = event.target.firstChild.textContent;
            adv.style.display = 'none';
            search.style.backgroundColor = 'inherit';
            container.style.color = 'inherit';
            text2.style.display = 'block';
            input.classList.remove('white');
            input.classList.add('input');
         }
      },
      searchClick: function(hour, flag, msg1, msg2, time, msg3) {
         var load = document.querySelector(DOM.load);
         var text2 = document.querySelector(DOM.text2);
         var data = document.querySelector(DOM.data);
         var body = document.querySelector(DOM.body);
         load.style.display = 'block';
         var dot = document.querySelectorAll(DOM.dot);
         var arrDot = Array.prototype.slice.call(dot);
         var img = document.querySelector(DOM.img);
         var mssg1 = document.querySelector(DOM.msg1);
         var mssg2 = document.querySelector(DOM.msg2);
         var times = document.querySelector(DOM.time);
         var grt = document.querySelector(DOM.grt);
         data.style.display = 'none';
         body.style.backgroundColor = '#0C070C';
         arrDot.forEach(function(cur, index) {
            cur.style.animation = 'load 1.5s -' + index/arrDot.length +'s infinite';
         });
         
         setTimeout(function() {
            load.style.display = 'none';
            text2.style.display = 'none';
            data.style.display = 'block';
            mssg1.textContent = msg1;
            mssg2.textContent = msg2;
            times.textContent = time;
            grt.textContent = msg3;
            img.src = flag;
            if (hour >= 7 && hour <= 18) {
               body.style.backgroundColor = 'white';
            } else if ((hour >= 19 && hour <= 23) || (hour >= 0 && hour <= 6)) {
               body.style.backgroundColor = '#0C070C';
            }
            
         }, 4000)
      }
   }
})();


// global Controller
var globalController = (function(ctr, UI) {
   var setUpEvent = function() {
      var DOM = UI.getDOM();
      var data = ctr.country();
      document.querySelector(DOM.list).addEventListener('click', function() {
         // change ui 
         UI.listClick();
         //display flag and country data 
         for (var i = 0;i < data.name.length; i++) {
            UI.addCountry(data.name[i], data.flag[i], data.id[i]);
         };
      });
      
      document.querySelector(DOM.search).addEventListener('click', function(){
         // store input value in a variable
         var input = document.querySelector(DOM.input).value;
         var id = data.name.indexOf(input);
         if (id !== -1) {
            var flag = data.flag[id];
            var timearr = data.time[id].split('');
            var time = parseInt(timearr[5]);
            var timee = isNaN(time) ? 1 : time;
            var now = new Date();
            var hou = now.getUTCHours();
            var hour = hou + timee >= 13 ? (hou+timee)%12: hou + timee;
            var mins = now.getUTCMinutes();
            var minutes = mins <= 9 ? '0'+mins : mins;
            var date = now.getUTCDate();
            var mon = now.getUTCMonth();
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var month = months[mon];
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var dayy = now.getUTCDay();
            var day = days[dayy];
            var year = now.getUTCFullYear();
            var AP = hou+timee >= 12 ? 'PM' : 'AM';
            var mssg1 = 'The Time and Date in ' + input;
            var mssg2 = day + ' ' + month + ' ' + date + ' ' + year;
            var mssg3 = hour + ':' + minutes + ' ' + AP;
            var msg;
            if (hou+timee < 12) {
               msg = 'morning';
            } else if (hou+timee >= 12 && hou+time <= 16) {
               msg = 'afternoon';
            } else {
               msg = 'evening';
            }
            var mssg4 = 'Good ' + msg + ' dear, it\'s ' + msg + ' in ' + input;
            var hours = hou + timee;
            if (input !== '') {
               UI.searchClick(hours, flag, mssg1, mssg2, mssg3, mssg4);
            }
         } else {
            alert('input is not an African country');
         }
         
         
      });
      
      document.querySelector(DOM.adv).addEventListener('click', function(event) {
         if (event.target.id.includes('button')) {
            var idi = event.target.id.split('-');
            var id = parseInt(idi[1]);
            var flag = '<img class="flag2" src="' + data.flag[id] + '">';
            UI.countryClick(id);
         }
      });
   };
   
   return {
      init: function() {
         setUpEvent();
         ctr.list();
      }
   };
})(controller, UIcontroller);

globalController.init();