'use strict';
/**
 * Created by turbo on 15-5-18.
 */
weatherApp.filter('weatherIcon', function(){
	return function(wid){
		var iconClass = '';
		switch (wid){
			case '00': iconClass = 'wi-day-sunny';break; //晴
			case '01': iconClass = 'wi-day-cloudy';break; //多云
			case '02': iconClass = 'wi-cloudy';break; //阴
			case '03': iconClass = 'wi-showers';break;//阵雨
			case '04': iconClass = 'wi-thunderstorm';break;//雷阵雨
			case '05': iconClass = 'wi-storm-showers';break;//雷阵雨伴有冰雹
			case '06': iconClass = 'wi-night-snow-wind';break;//雨夹雪
			case '07': iconClass = 'wi-sleet';break;//小雨
			case '08': iconClass = 'wi-rain-mix';break;//中雨
			case '09': iconClass = 'wi-rain-wind';break;//大雨
			case '10': iconClass = 'wi-rain';break;//暴雨
			case '11': iconClass = 'wi-hail';break;//大暴雨
			case '12': iconClass = 'wi-sprinkle';break;//特大暴雨
			case '13': iconClass = 'wi-snow';break;//阵雪
			case '14': iconClass = 'wi-snow-wind';break;//小雪
			case '15': iconClass = 'wi-day-snow-wind';break;//中雪
			case '16': iconClass = 'wi-night-snow-wind';break;//大雪
			case '17': iconClass = 'wi-snow-wind';break;//暴雪
			case '18': iconClass = 'wi-fog';break;//雾
			case '19': iconClass = 'wi-night-sprinkle';break;//冻雨
			case '20': iconClass = 'wi-dust';break;//沙尘暴
			case '21': iconClass = 'wi-rain-mix';break;//小雨-中雨
			case '22': iconClass = 'wi-rain-wind';break;//中雨-大雨
			case '23': iconClass = 'wi-rain';break;//大雨-暴雨
			case '24': iconClass = 'wi-hail';break;//暴雨-大暴雨
			case '25': iconClass = 'wi-sprinkle';break;//大暴雨-特大暴雨
			case '26': iconClass = 'wi-day-snow-wind';break;//小雪-中雪
			case '27': iconClass = 'wi-night-snow-wind';break;//中雪-大雪
			case '28': iconClass = 'wi-snow-wind';break;//大雪-暴雪
			case '29': iconClass = 'wi-dust';break;//浮尘
			case '30': iconClass = 'wi-smoke';break;//扬沙
			case '31': iconClass = 'wi-tornado';break;//强沙尘暴
			case '53': iconClass = 'wi-smog';break;//霾
			default : iconClass = 'wi-day-windy';
		}
		return iconClass;
	}
});