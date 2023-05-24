	$(document).ready(function(){

  var elem = $('.header'),         //    Контейнер, в котором будем проводить анимацию
      pos = elem.offset(),            //    Позиция элемента
      elem_left = pos.left,           //    Слева
      elem_top = pos.top,             //    Сверху
      elem_width = elem.width(),      //    Ширина элемента
      elem_height = elem.height(),    //    Высота элемента
      x_center,    //    Координаты центра по оси X
      y_center;    //    Координаты центра по оси Y

//    Обрабатываем событие перемещения курсора мыши
  $('.header').mousemove(function(e){    

//    Определяем центр элемента (формула легко гуглится)
    x_center = ( elem_width / 2 ) - ( e.pageX - elem_left );
    y_center = ( elem_height / 2 ) - ( e.pageY - elem_top );

//    Проходим по всем блокам с изображениями)
    $('.parallax').each(function(){

      var speed = $(this).attr('data-speed'),     //    Определяем скорость 
          xPos = Math.round(-1*x_center/20*speed),//    Высчитываем позицию по оси X, движения будут инвертированы (-1). Формула подбиралась на глаз
          yPos = Math.round(y_center/20*speed);   //    Высчитываем позицию по оси Y

//    Перемещение по оси Y делаем до определенной точки, потом перемещение останавливаем
      if (yPos < 0)
        yPos = -2*speed;

//    Непосредственно перенос      
      $(this).css('transform', 'translate3d('+xPos+'px, '+yPos+'px, 0px)');

        });
    });
});