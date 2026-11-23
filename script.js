/* ===== El Cofre de los Sentimientos — script.js ===== */
(() => {
'use strict';

/* ---------- Utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pick = (arr) => arr[(Math.random() * arr.length) | 0];
const TAU = Math.PI * 2;
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const shuffle = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [r[i], r[j]] = [r[j], r[i]]; } return r; };
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

/* =====================================================
   CONTENIDO
   ===================================================== */
const REASONS = [
  'Porque tu sonrisa le cambia el color a mi día en un segundo.',
  'Porque contigo hasta lo más simple se vuelve un recuerdo que quiero guardar.',
  'Porque tu esfuerzo me inspira a ser mejor cada día.',
  'Porque tu risa es mi sonido favorito de todo el universo.',
  'Porque a tu lado el silencio también se siente como hogar.',
  'Porque luchas por tus sueños incluso cuando estás cansada.',
  'Porque eres valiente aunque a veces no te sientas fuerte.',
  'Porque tu ternura hace más suave el mundo entero.',
  'Porque tienes una manera única de ver las cosas bonitas de la vida.',
  'Porque cuando me abrazas, todo lo difícil se queda esperando afuera.',
  'Porque eres inteligente de una forma que me deja admirado.',
  'Porque nunca te das por vencida, aunque el camino se ponga cuesta arriba.',
  'Porque tu forma de cuidar a los demás me enseña lo que es amar de verdad.',
  'Porque contigo aprendí que la felicidad vive en las cosas pequeñas.',
  'Porque eres tan especial que no existe nadie que se te parezca.',
  'Porque me haces querer construir un futuro bonito.',
  'Porque tu mirada me calma incluso en los días más ruidosos.',
  'Porque haces que los planes simples se sientan como aventuras.',
  'Porque tienes un corazón enorme y se nota en todo lo que haces.',
  'Porque eres capaz de convertir un mal día en una historia que contar.',
  'Porque me haces sentir que ser yo mismo es suficiente.',
  'Porque tu dedicación a tus estudios me llena de orgullo.',
  'Porque sacrificas tanto por lo que quieres lograr, y eso es admirable.',
  'Porque eres hermosa por fuera y todavía más por dentro.',
  'Porque un mensaje tuyo, aunque sea cortito, me alegra la tarde.',
  'Porque eres mi lugar tranquilo en medio de cualquier tormenta.',
  'Porque lograste ser fuerte sin dejar de ser dulce.',
  'Porque cada meta que cumples hace que el mundo mejore un poquito.',
  'Porque me enseñaste a mirar el cielo y sentirme pequeño y afortunado a la vez.',
  'Porque a tu lado el tiempo vuela y aun así quiero más.',
  'Porque tu paciencia conmigo es un regalo que no sé cómo agradecer.',
  'Porque cuando algo te importa, lo das todo.',
  'Porque tienes un brillo que no se puede fingir ni aprender.',
  'Porque eres como un tulipán rosado: delicada, elegante y muy fuerte.',
  'Porque me haces reír aunque no tenga ganas.',
  'Porque entre todas las estrellas, mi favorita eres tú.',
  'Porque me encanta cómo te emocionas con lo que te gusta.',
  'Porque dejas cada lugar más bonito de como lo encontraste.',
  'Porque nuestras conversaciones largas son mi parte favorita del día.',
  'Porque en tus abrazos descubrí lo que significa estar en casa.',
  'Porque eres tan tierna como una jirafita con un tulipán en la mano.',
  'Porque tu corazón es tan noble que me motiva a ser digno de él.',
  'Porque eres adorable como un dinosaurio cuidando un corazón.',
  'Porque tu constancia es silenciosa, terca y hermosa.',
  'Porque me haces creer en los finales felices.',
  'Porque me sorprende cuánto has crecido y cuánto aún vas a crecer.',
  'Porque sabes escuchar de verdad, no solo oír.',
  'Porque contigo cualquier lugar se siente más cálido.',
  'Porque tus sueños son enormes y mereces cumplir cada uno.',
  'Porque eres mi persona favorita para compartir un silencio, una risa o un plan.',
  'Porque tu alma tiene una luz que reconocería en cualquier universo.',
  'Porque, como Orihime, tienes una bondad que sana sin que te des cuenta.',
  'Porque, como Ichigo, peleas por lo que amas aunque el camino sea difícil.',
  'Porque nuestras almas se reconocieron, y para mí eso es destino.',
  'Porque contigo el mundo se siente menos pesado.',
  'Porque te levantas una y otra vez, y eso es lo más valiente que existe.',
  'Porque haces sentir importante a quien está contigo.',
  'Porque tus detalles, aun los más pequeños, me enamoran.',
  'Porque me encanta verte concentrada en lo que haces.',
  'Porque haces que mi vida tenga más color, más risa y más sentido.',
  'Porque eres una mezcla perfecta de fuerza, dulzura y locura bonita.',
  'Porque me haces sentir acompañado incluso a la distancia.',
  'Porque eres de las pocas personas a quienes quiero contarles todo.',
  'Porque tus ganas de aprender son contagiosas.',
  'Porque aun en tus días difíciles sigues siendo luz para los demás.',
  'Porque cada recuerdo contigo es un tesoro que cuido con cariño.',
  'Porque me inspiras a soñar más grande.',
  'Porque te esfuerzas y te importa, y eso dice mucho de quién eres.',
  'Porque con solo pensar en ti, el corazón me sonríe.',
  'Porque eres mi «sí» a cualquier plan, a cualquier hora, en cualquier lugar.',
  'Porque terminaste otro año de estudio con esfuerzo y con el corazón por delante.',
  'Porque sabes ser tierna sin dejar de ser fuerte.',
  'Porque mereces todo lo bueno, y quiero ayudarte a que te llegue.',
  'Porque mi vida tiene un antes y un después de ti, y me gusta más el después.',
  'Porque tu paciencia con el mundo me enseña a respirar.',
  'Porque tu forma de querer es sincera, profunda y sin dobleces.',
  'Porque cuando te ríes de verdad, el universo se queda en silencio para escucharte.',
  'Porque eres irremplazable, y no hay otra palabra que lo diga mejor.',
  'Porque mi parte favorita de cualquier plan es que tú estés en él.',
  'Porque aprendes de cada tropiezo y vuelves a levantarte más sabia.',
  'Porque tienes una belleza que no depende de nada ni de nadie.',
  'Porque me recuerdas que los sueños se trabajan, pero también se disfrutan.',
  'Porque tu cariño me hace sentir protegido y libre al mismo tiempo.',
  'Porque contigo todos los días normales se vuelven especiales.',
  'Porque eres de esas personas que cualquiera quisiera tener cerca.',
  'Porque amas con el corazón entero, sin guardarte nada.',
  'Porque tus ojos brillan cuando hablas de lo que te apasiona.',
  'Porque me enseñaste que amar también es cuidar, esperar y acompañar.',
  'Porque cada noche estrellada me recuerda a ti.',
  'Porque eres perseverante como quien sabe que el esfuerzo siempre da frutos.',
  'Porque tu presencia vale más que mil palabras bonitas, y aun así quiero decirte todas.',
  'Porque me haces querer cuidar de ti, de tus sueños y de tu sonrisa.',
  'Porque nuestras bromas internas son mi idioma favorito.',
  'Porque aunque el mundo cambie, tú eres mi constante.',
  'Porque eres mi aventura favorita y mi calma preferida.',
  'Porque tu alma es un jardín donde siempre florece algo hermoso.',
  'Porque aún me quedan miles de motivos por descubrir.',
  'Porque cada día a tu lado me hace querer más y mejor.',
  'Porque cuando pienso en ti, entiendo para qué sirven las palabras bonitas.',
  'Porque simplemente eres tú, y eso para mí es todo.'
];

const HARD_DAYS = [
  'Respira. Lo estás haciendo mejor de lo que crees, y estoy muy orgulloso de ti.',
  'Un mal día no cancela todo lo que ya has logrado. Mira cuánto has avanzado.',
  'Eres más fuerte de lo que sientes hoy. Descansar también es avanzar.',
  'No tienes que poder con todo hoy. Un paso a la vez, y yo estoy contigo.',
  'Tu valor no depende de tus notas ni de tu productividad. Vales por quien eres.',
  'Eres inteligente, capaz y trabajadora. El cansancio no cambia eso.',
  'Lo que hoy te pesa, algún día lo recordarás como algo que ya superaste.',
  'Si hoy no puedes con todo, está bien. Mañana también cuenta, y yo te acompaño.',
  'Equivocarte no es fracasar. Es señal de que estás intentando, y eso es de valientes.',
  'Recuerda cuántas veces ya te levantaste. Esta vez también puedes.',
  'Mereces tratarte con la misma ternura con la que tratas a los demás.',
  'Eres irremplazable. Aunque hoy no lo sientas, el mundo es mejor contigo en él.',
  'Tus sueños siguen ahí, esperándote. Un día difícil no los apaga.',
  'Toma agua, respira hondo, estírate y recuerda que eres increíble.',
  'No estás sola. Aunque el día sea gris, alguien cree en ti con todo el corazón.',
  'Todo el esfuerzo que haces importa, aunque hoy no veas el resultado.',
  'Estás creciendo, aunque duela. Y yo veo en quién te estás convirtiendo: es hermoso.',
  'Puedes llorar, descansar, quejarte y volver a empezar. Todo eso también es ser fuerte.',
  'Hay mucha gente que se siente afortunada de conocerte. Yo, la primera.',
  'Eres capaz de cosas enormes. La prueba es todo lo que ya has logrado.',
  'Si hoy sientes que no llegas, recuerda: llegar despacio sigue siendo llegar.',
  'No eres tus errores ni tus días malos. Eres muchísimo más que eso.',
  'Tu esfuerzo tiene sentido, tus metas tienen sentido y tienes todo mi apoyo.',
  'Un descanso no es rendirse. Es juntar fuerzas para seguir brillando.',
  'Mereces cumplir cada meta que te propongas. Cada una.',
  'Mientras tú dudas, yo recuerdo lo valiosa que eres. Déjame creer por los dos un ratito.',
  'Cierra los ojos, respira y piensa en algo que te haga sonreír. Si quieres, piensa en mí.',
  'Eres como un tulipán: puedes doblarte con el viento, pero siempre vuelves a florecer.',
  'Tu forma de luchar me inspira. Hoy déjame recordarte lo que tú me enseñas a mí.',
  'Pase lo que pase, estoy de tu lado. Siempre.'
];

const SKY = [
  { x: 12, y: 22, t: 'Entre todas las galaxias, mis ojos siempre terminan encontrándote a ti.' },
  { x: 28, y: 60, t: 'Si el universo tiene un centro, yo sé que el mío eres tú.' },
  { x: 22, y: 84, t: 'Cada estrella que ves ya ardía antes de que nos conociéramos. Yo ya te esperaba sin saberlo.' },
  { x: 40, y: 30, t: 'La luz de algunas estrellas viaja millones de años para llegar. Yo habría esperado lo mismo por ti.' },
  { x: 52, y: 70, t: 'Contigo entendí que «infinito» no es una cifra: es una forma de querer.' },
  { x: 60, y: 16, t: 'Si pudiera pedir un deseo por cada estrella, todos serían para verte feliz.' },
  { x: 72, y: 44, t: 'Hay galaxias enteras entre nosotros y el cielo, y aun así tú eres lo más grande que he visto.' },
  { x: 84, y: 22, t: 'Eres mi constelación favorita: la que reconozco incluso con los ojos cerrados.' },
  { x: 88, y: 66, t: 'En un universo enorme, que nuestras vidas se cruzaran es un milagro pequeño y perfecto.' },
  { x: 66, y: 86, t: 'Cuando todo se oscurece, pienso en ti y se me encienden mil estrellas.' },
  { x: 8, y: 52, t: 'Cada latido mío es un pequeño big bang que empieza con tu nombre.' },
  { x: 46, y: 50, t: 'Prometo seguir mirando estrellas contigo hasta que se nos acaben los deseos... y entonces inventar más.' }
];

const BLEACH = {
  ichigo: { icon: '🧡', name: 'Ichigo', blurb: 'La valentía de quien no suelta lo que ama.', lines: [
    'Como Ichigo, tú no sueltas lo que amas, aunque el camino sea difícil. Esa terquedad bonita me enamora.',
    'Ichigo protege con el corazón por delante; tú te levantas con el tuyo. Las dos cosas son una forma de coraje.',
    'Tu espada son tus ganas de seguir. Cada día que no te rindes, tu fuerza espiritual brilla más.' ] },
  orihime: { icon: '🌸', name: 'Orihime', blurb: 'La ternura que sana sin pedir nada a cambio.', lines: [
    'Como Orihime, tienes una ternura que sana sin pedir nada a cambio. Ojalá siempre lo sepas.',
    'Hay bondades que parecen suaves y son más poderosas que cualquier espada. La tuya es de esas.',
    'Si tu cariño fuera un escudo, nada ni nadie podría lastimar a quienes quieres.' ] },
  almas: { icon: '🦋', name: 'Las almas', blurb: 'Lo que se reconoce más allá de las palabras.', lines: [
    'Creo que las almas se reconocen: la mía te reconoció antes que mis palabras.',
    'Aunque pasaran mil vidas, mi alma te buscaría entre todas las demás.',
    'Un alma como la tuya se nota desde lejos: cálida, y azul como el cielo justo antes del amanecer.' ] },
  destinos: { icon: '🌌', name: 'Los destinos', blurb: 'Caminos que se cruzan por una razón.', lines: [
    'No sé si el destino está escrito, pero si lo está, me alegra que tu nombre aparezca en mis páginas.',
    'Algunos caminos se cruzan por casualidad; el nuestro se siente como una decisión del universo.',
    'Si pudiera elegir mi destino, elegiría el que termina contigo, en cada versión de la historia.' ] },
  promesas: { icon: '💙', name: 'Las promesas', blurb: 'Lo que se jura con el corazón y se cumple a diario.', lines: [
    'Te prometo ser tu refugio cuando el mundo se vuelva una batalla.',
    'Prometo no soltar tu mano, ni en los días tranquilos ni en los más difíciles.',
    'Mi promesa es simple: estar, cuidarte, creer en ti y seguir eligiéndote.' ] }
};

const TULIP_MSGS = [
  'Eres la primavera que llegó a mi vida sin avisar.',
  'Si pudiera regalarte un jardín entero, aun así sería pequeño comparado con lo que siento.',
  'Cada pétalo guarda un «gracias» por existir.',
  'Eres tan hermosa como un tulipán abriéndose al amanecer.',
  'Que nunca te falte luz, agua ni alguien que crea en ti.',
  'Como las flores, tú también mereces florecer a tu propio ritmo.',
  'Esta flor te recuerda algo: eres valiosa, siempre.',
  'Hay amores que crecen en silencio, como este jardín.',
  'Te regalaría todos los tulipanes del mundo, pero me quedo contigo.'
];
const TULIP_COLORS = [['#ff8fbf', '#ffc2dc'], ['#ff5c9d', '#ff9fc7'], ['#ffb3d1', '#fff0f6'], ['#f06bb0', '#ffa6d4'], ['#ff7aa8', '#ffd0e2'], ['#e85aa3', '#ff9bc9'], ['#ffa0c4', '#ffdbe9'], ['#ff6fae', '#ffb0d3'], ['#f58ac0', '#ffd3ea']];

const GIRAFFE_MSG = '¡Hola, Nina! Estiré el cuello lo más alto que pude para encontrar el tulipán más bonito del mundo. Es para ti, porque alguien muy especial me dijo que mereces todas las flores.';
const DINO_NOTE = [
  'Querida Nina:',
  'Me pidieron cuidar este corazón y no me pesa nada, porque es tuyo.',
  'Estoy aquí para recordarte que hoy, mañana y siempre vales muchísimo.',
  'Cuídate, descansa y sonríe, que a mí me sale mejor cuando tú sonríes.',
  '— Tu dinosaurio guardián 🦖'
];

const GARDEN_ITEMS = [
  { id: 'star', icon: '⭐', name: 'La estrella que cayó', x: .67, y: .34,
    msg: 'Esta estrella no cayó por accidente. Bajó a mirarte de cerca, porque hasta el cielo quería conocer a la chica de la que tanto hablan mis pensamientos. Primer mensaje: tienes luz propia, y nadie puede apagarla.' },
  { id: 'coin', icon: '🪙', name: 'La moneda de los deseos', x: .5, y: .77,
    msg: 'En el fondo de la fuente había una moneda con un deseo grabado: «Que Nina cumpla cada sueño, uno por uno». Yo ya lo pedí. Ahora solo falta que lo hagas realidad, y yo estaré aplaudiendo en primera fila.' },
  { id: 'butterfly', icon: '🦋', name: 'La mariposa azul', x: .31, y: .56,
    msg: 'Dicen que las mariposas de luz guían a las almas hacia donde deben llegar. Esta te guio hasta aquí, igual que la vida me guio hasta ti. Eres mi destino favorito.' },
  { id: 'book', icon: '📖', name: 'El cuaderno de tus sueños', x: .86, y: .84,
    msg: 'Entre estas páginas están tus noches de estudio, tus dudas y tus logros. No están en blanco: están llenas de esfuerzo. Estoy muy orgulloso de ti, y lo estaré siempre.' },
  { id: 'key', icon: '🗝️', name: 'La llave dorada', x: .12, y: .4,
    msg: 'Esta llave abre la cajita dorada... y mi corazón se abrió desde que llegaste a mi vida. Nunca la perdí: la guardé para ti. Ve, que queda un último secreto por abrir.' }
];

const FINAL = [
  'Nina:',
  'Si estás leyendo esto, encontraste los cinco tesoros del jardín. Pero quiero confesarte algo: el mayor tesoro nunca estuvo escondido entre las flores. Siempre fuiste tú.',
  'Te amo con esa clase de amor que no hace ruido: el que se queda, el que cuida, el que celebra tus logros como si fueran míos y carga contigo los días pesados.',
  'Gracias por tu esfuerzo, por tu ternura y por dejarme caminar a tu lado. Eres mi hogar, mi aventura y mi mejor casualidad.',
  'Si el universo me dejara elegir una vez más, volvería a buscarte entre todas las estrellas, entre todos los mundos y todas las vidas. Y te encontraría, porque las almas que se pertenecen siempre se reconocen.',
  'Prometo seguir plantando recuerdos contigo, regar tus sueños con paciencia, cuidar tu sonrisa y quedarme cuando el cielo se ponga oscuro. Este jardín es pequeño, pero lo que siento por ti no cabe ni en toda la galaxia.',
  'Te amo, Nina. Hoy, mañana y en cada jardín que todavía nos falta descubrir. 🌷',
  '— Tu persona favorita ❤️'
];

const LETTER = [
  'Mi Nina:',
  'Hay cosas que se sienten tan grandes que, cuando intento decirlas en voz alta, se me quedan temblando en la garganta. Por eso te escribo: para tomarme el tiempo de decirte todo lo que a veces no sé cómo decirte de frente.',
  'Quiero empezar por lo más sencillo y lo más verdadero: eres hermosa. Y no hablo solo de lo que se ve, aunque podría pasarme la vida mirándote. Hablo de tu forma de existir: la dulzura con la que tratas a los demás, la manera en que te ríes de lo que te hace feliz, la facilidad con la que haces que cualquier lugar se sienta más cálido cuando estás en él. Eres única. No hay otra Nina en ningún rincón del universo, y yo tuve la suerte inmensa de encontrarte.',
  'Quiero que sepas lo orgulloso que estoy de ti. Sé que no siempre lo ves, porque cuando estás cansada solo ves lo que falta y nunca todo lo que ya recorriste. Pero yo sí lo veo. Veo las noches de estudio, las páginas que repetiste una vez más, los días en que te faltaron fuerzas y de todos modos seguiste, las cosas que dejaste de lado para no soltar tus sueños. Terminar otro año de tu carrera no es un trámite: es la prueba de cuánto vales y de cuánto te importa lo que estás construyendo.',
  'Admiro cómo luchas. De verdad. Hay personas que sueñan y esperan, y hay personas como tú, que sueñan y se levantan a trabajar por ello aunque nadie las esté mirando. Esa constancia tuya, silenciosa y terca, es una de las cosas más bonitas que he visto en alguien.',
  'Mereces cumplir cada una de tus metas. Cada una, incluso las que todavía no te atreves a decir en voz alta. Y quiero que sepas que, pase lo que pase en el camino, yo quiero estar ahí: acompañándote, aplaudiendo los logros pequeños y los grandes, sosteniéndote la mano cuando todo se ponga cuesta arriba y viéndote crecer, porque ver en quién te conviertes es un privilegio que no pienso perderme.',
  'Y si algún día amanece pesado, si sientes que no eres suficiente, que te equivocaste, que te falta demasiado... por favor, vuelve a esta carta. Recuerda que el cansancio no te define, que los errores no te quitan valor y que una mala semana no borra a la persona increíble que eres. Tu valor no depende de tus notas, ni de lo productiva que seas, ni de lo bien que te salgan las cosas. Vales por quien eres.',
  'Para mí eres irremplazable. Lo digo sin exagerar y sin dudar. Hay personas que pasan, y hay personas que cambian el lugar donde uno vive por dentro. Tú eres de las segundas. Mi vida tiene un antes y un después de ti, y me gusta muchísimo más el después.',
  'A veces miro el cielo y pienso en lo inmenso que es el universo: tantas estrellas, tantas galaxias, tantas posibilidades... y aun así, nuestros caminos se cruzaron. Si eso no es un pequeño milagro, no sé qué lo sea. Me gusta imaginar que nuestras almas ya se andaban buscando desde antes, como en esas historias de Bleach, donde los lazos verdaderos atraviesan distancias, mundos y hasta la muerte. Yo no necesito espadas ni poderes para saber lo que siento: sé que tu alma y la mía se reconocieron, y que eso es lo más valioso que me ha pasado. Si algún día el mundo se complica, quiero ser de los que no sueltan, de los que se quedan, de los que protegen lo que aman.',
  'Por eso te hago una promesa: voy a seguir construyendo recuerdos contigo. Los grandes y los chiquitos. Las risas tontas, las conversaciones largas, las fotos mal sacadas, los planes improvisados y los que soñemos durante meses. Quiero llenar nuestro pequeño universo de momentos que algún día podamos mirar juntos para decir: «qué bonito fue todo esto, y lo que todavía falta».',
  'Gracias por ser como eres. Gracias por tu paciencia, por tu ternura, por tu esfuerzo y por dejarme formar parte de tu vida. Ojalá que, mientras lees esto, sientas aunque sea una pequeña parte de lo mucho que te quiero.',
  'Te quiero hoy, te querré mañana y seguiré eligiéndote en cada versión del futuro.'
];
const SIGN = 'Con todo mi amor, tu persona favorita. ❤️';

/* =====================================================
   ESTADO (localStorage)
   ===================================================== */
const KEY = 'el-cofre-de-nina:v1';
const defaults = () => ({ chest: false, reasons: [], hard: 0, stars: [], tulips: [], bleach: [], guard: { flower: false, note: false }, letter: false, found: [], done: false, intro: false, sound: true, music: true });
function load() {
  try {
    const r = JSON.parse(localStorage.getItem(KEY));
    const d = defaults();
    if (r && typeof r === 'object') { Object.assign(d, r); d.guard = Object.assign({ flower: false, note: false }, r.guard || {}); }
    return d;
  } catch (e) { return defaults(); }
}
let state = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* sin almacenamiento */ } }

/* =====================================================
   SONIDO (WebAudio sintetizado, opcional)
   ===================================================== */
let ac = null;
function actx() {
  try {
    if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ac = new A(); }
    if (ac.state === 'suspended') ac.resume();
  } catch (e) { return null; }
  return ac;
}
function tone(f, t0, d, type, v, slide) {
  const a = actx(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), st = a.currentTime + t0;
  o.type = type || 'sine';
  o.frequency.setValueAtTime(f, st);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, st + d);
  g.gain.setValueAtTime(0.0001, st);
  g.gain.exponentialRampToValueAtTime(v || .06, st + .02);
  g.gain.exponentialRampToValueAtTime(.0001, st + d);
  o.connect(g); g.connect(a.destination);
  o.start(st); o.stop(st + d + .05);
}
const SFX = {
  click: () => tone(620, 0, .12, 'sine', .05, 880),
  flip: () => tone(400, 0, .1, 'triangle', .05, 720),
  pop: () => tone(520, 0, .14, 'sine', .06, 1040),
  star: () => { tone(1046, 0, .4, 'sine', .05); tone(1568, .08, .5, 'sine', .04); },
  whoosh: () => tone(300, 0, .35, 'sine', .035, 900),
  open: () => { tone(220, 0, .9, 'sawtooth', .025, 660); [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, .3 + i * .11, .8, 'sine', .05)); },
  chime: () => [659, 784, 988, 1319].forEach((f, i) => tone(f, i * .12, .9, 'sine', .05)),
  sparkle: () => [1760, 2093, 2637, 3136].forEach((f, i) => tone(f, i * .07, .35, 'sine', .03))
};
function sfx(n) { if (!state.sound) return; try { if (SFX[n]) SFX[n](); } catch (e) { /* ignorar */ } }
function syncSoundBtn() {
  const b = $('#btn-sound');
  b.textContent = state.sound ? '🔊' : '🔇';
  b.setAttribute('aria-pressed', String(state.sound));
  b.setAttribute('aria-label', state.sound ? 'Sonido activado. Toca para silenciar' : 'Sonido desactivado. Toca para activar');
}

/* =====================================================
   SPRITES Y PARTÍCULAS
   ===================================================== */
function heartPath(g, cx, cy, s) {
  g.beginPath();
  g.moveTo(cx, cy + s * .6);
  g.bezierCurveTo(cx - s * 1.1, cy - s * .05, cx - s * .55, cy - s * .8, cx, cy - s * .3);
  g.bezierCurveTo(cx + s * .55, cy - s * .8, cx + s * 1.1, cy - s * .05, cx, cy + s * .6);
  g.closePath();
}
const SPR = {};
function makeSprites() {
  const mk = (size, fn) => { const c = document.createElement('canvas'); c.width = c.height = size; fn(c.getContext('2d'), size); return c; };
  const heart = (a, b) => mk(48, (g, s) => {
    const gr = g.createLinearGradient(0, 0, 0, s); gr.addColorStop(0, a); gr.addColorStop(1, b);
    g.fillStyle = gr; heartPath(g, s / 2, s * .45, s * .42); g.fill();
    g.fillStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.ellipse(s * .33, s * .27, s * .07, s * .045, -.6, 0, TAU); g.fill();
  });
  SPR.hearts = [heart('#ff9ec8', '#ff4f93'), heart('#ffd0e6', '#ff8cba'), heart('#e1c8ff', '#a878ff'), heart('#fff0a8', '#ffc94a')];
  const petal = (a, b) => mk(48, (g, s) => {
    const gr = g.createLinearGradient(s * .3, 0, s * .7, s); gr.addColorStop(0, a); gr.addColorStop(1, b);
    g.fillStyle = gr; g.beginPath(); g.moveTo(s / 2, s * .04);
    g.bezierCurveTo(s * .95, s * .3, s * .8, s * .9, s / 2, s * .96);
    g.bezierCurveTo(s * .2, s * .9, s * .05, s * .3, s / 2, s * .04); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(s / 2, s * .12); g.lineTo(s / 2, s * .8); g.stroke();
  });
  SPR.petals = [petal('#ffd1e3', '#ff7fb3'), petal('#ffb3d1', '#ff4f93'), petal('#ffffff', '#ffc2dc'), petal('#ffc2f0', '#e17bd0')];
  const spark = (col) => mk(48, (g, s) => {
    const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, col); gr.addColorStop(.35, col); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.globalAlpha = .55; g.fillStyle = gr; g.fillRect(0, 0, s, s); g.globalAlpha = 1;
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(s / 2, 4); g.quadraticCurveTo(s / 2 + 3, s / 2 - 3, s - 4, s / 2); g.quadraticCurveTo(s / 2 + 3, s / 2 + 3, s / 2, s - 4);
    g.quadraticCurveTo(s / 2 - 3, s / 2 + 3, 4, s / 2); g.quadraticCurveTo(s / 2 - 3, s / 2 - 3, s / 2, 4); g.fill();
  });
  SPR.spark = [spark('#fff3b8'), spark('#bfe9ff'), spark('#ffd1e8')];
  const glow = (r, gg, b) => mk(64, (g, s) => {
    const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, `rgba(${r},${gg},${b},.95)`); gr.addColorStop(.4, `rgba(${r},${gg},${b},.35)`); gr.addColorStop(1, `rgba(${r},${gg},${b},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, s, s);
  });
  SPR.glowPink = glow(255, 140, 200); SPR.glowGold = glow(255, 230, 130); SPR.glowBlue = glow(130, 210, 255); SPR.glowFly = glow(220, 255, 140);
}
makeSprites();

const bg = $('#bg'), bgx = bg.getContext('2d');
const fx = $('#fx'), fxx = fx.getContext('2d');
let W = 0, H = 0, DPR = 1;
let stars = [], amb = [], bursts = [], shoot = null, shootT = 4, fxDirty = false, gardenActive = false;

function put(c, img, x, y, size, rot, a) {
  const k = size / 48, cs = Math.cos(rot) * k * DPR, sn = Math.sin(rot) * k * DPR;
  c.globalAlpha = a; c.setTransform(cs, sn, -sn, cs, x * DPR, y * DPR); c.drawImage(img, -24, -24);
}
function resetT(c) { c.setTransform(DPR, 0, 0, DPR, 0, 0); c.globalAlpha = 1; }

function initStars() {
  const n = clamp(Math.floor(W * H / 9500), 40, reduceMotion ? 60 : 140);
  const cols = ['#ffffff', '#ffffff', '#d9c7ff', '#bfe3ff', '#ffe9a8'];
  stars = Array.from({ length: n }, () => ({ x: rand(0, W), y: rand(0, H), r: rand(.4, 1.6), p: rand(0, TAU), s: rand(.5, 1.8), c: pick(cols) }));
}
function initAmbient() {
  amb = [];
  const np = reduceMotion ? 5 : (W < 640 ? 10 : 20), nh = reduceMotion ? 3 : (W < 640 ? 5 : 9);
  for (let i = 0; i < np; i++) amb.push({ img: pick(SPR.petals), x: rand(0, W), y: rand(-H, H), vy: rand(18, 38), sw: rand(10, 30), ph: rand(0, TAU), sp: rand(.6, 1.4), rot: rand(0, TAU), vr: rand(-1, 1), size: rand(14, 26), a: rand(.5, .85) });
  for (let i = 0; i < nh; i++) amb.push({ img: pick(SPR.hearts), x: rand(0, W), y: rand(0, H), vy: -rand(14, 30), sw: rand(8, 20), ph: rand(0, TAU), sp: rand(.5, 1.1), rot: rand(-.4, .4), vr: 0, size: rand(12, 22), a: rand(.35, .7) });
}
function resizeFx() {
  DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  W = window.innerWidth; H = window.innerHeight;
  [bg, fx].forEach(c => { c.width = Math.floor(W * DPR); c.height = Math.floor(H * DPR); });
  resetT(bgx); resetT(fxx);
  initStars(); initAmbient();
}

function burst(x, y, o = {}) {
  const n = o.n || 50, power = o.power || 300, types = o.types || ['h', 'p', 's'];
  for (let i = 0; i < n && bursts.length < 520; i++) {
    const ang = rand(0, TAU), sp = rand(.3, 1) * power, k = pick(types);
    bursts.push({ img: k === 'h' ? pick(SPR.hearts) : k === 'p' ? pick(SPR.petals) : pick(SPR.spark), d: 0, x, y,
      vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - (o.up == null ? 80 : o.up), life: 0, max: rand(1.2, 2.4),
      rot: rand(0, TAU), vr: rand(-4, 4), size: k === 's' ? rand(12, 22) : rand(12, 26), g: k === 's' ? 0 : rand(90, 200), drag: .985 });
  }
}
function petalRain(n, dur) {
  for (let i = 0; i < n && bursts.length < 520; i++) {
    bursts.push({ img: pick(SPR.petals), d: rand(0, dur), x: rand(0, W), y: -20, vx: rand(-30, 30), vy: rand(70, 170), life: 0, max: rand(6, 9),
      rot: rand(0, TAU), vr: rand(-3, 3), size: rand(14, 28), g: 0, drag: 1, sway: rand(0, TAU) });
  }
}
function flashNow() { const f = $('#flash'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }

let last = 0, bgSkip = 0;
function frame(t) {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dtms = t - last;
  if (dtms < 30) return;
  last = t;
  const dt = Math.min(dtms / 1000, .05);

  /* fondo: estrellas + pétalos + corazones (más ligero mientras se juega en el jardín) */
  bgSkip++;
  if (!gardenActive || bgSkip % 2 === 0) {
    resetT(bgx); bgx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.p += dt * s.s;
      bgx.globalAlpha = .35 + .65 * Math.abs(Math.sin(s.p));
      bgx.fillStyle = s.c; bgx.beginPath(); bgx.arc(s.x, s.y, s.r, 0, TAU); bgx.fill();
    }
    bgx.globalAlpha = 1;
    if (!reduceMotion) {
      shootT -= dt;
      if (shootT <= 0 && !shoot) { shoot = { x: rand(W * .2, W), y: rand(0, H * .35), vx: -rand(380, 560), vy: rand(160, 260), l: 0 }; shootT = rand(6, 11); }
      if (shoot) {
        shoot.x += shoot.vx * dt; shoot.y += shoot.vy * dt; shoot.l += dt;
        const gr = bgx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * .12, shoot.y - shoot.vy * .12);
        gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        bgx.strokeStyle = gr; bgx.lineWidth = 2; bgx.beginPath(); bgx.moveTo(shoot.x, shoot.y); bgx.lineTo(shoot.x - shoot.vx * .12, shoot.y - shoot.vy * .12); bgx.stroke();
        if (shoot.l > 1.2) shoot = null;
      }
    }
    for (const a of amb) {
      a.ph += dt * a.sp * (gardenActive ? 2 : 1); a.y += a.vy * dt * (gardenActive ? 2 : 1); a.x += Math.sin(a.ph) * a.sw * dt * (gardenActive ? 2 : 1); a.rot += a.vr * dt * (gardenActive ? 2 : 1);
      if (a.vy > 0 && a.y > H + 30) { a.y = -30; a.x = rand(0, W); }
      if (a.vy < 0 && a.y < -30) { a.y = H + 30; a.x = rand(0, W); }
      const fade = a.vy < 0 ? clamp(a.y / (H * .25), 0, 1) : 1;
      put(bgx, a.img, a.x, a.y, a.size, a.rot, a.a * fade);
    }
    resetT(bgx);
  }

  /* efectos (por encima de todo) */
  if (bursts.length) {
    fxDirty = true;
    resetT(fxx); fxx.clearRect(0, 0, W, H);
    for (let i = bursts.length - 1; i >= 0; i--) {
      const p = bursts[i];
      if (p.d > 0) { p.d -= dt; continue; }
      p.life += dt;
      if (p.life >= p.max || p.y > H + 40) { bursts.splice(i, 1); continue; }
      p.vy += p.g * dt; p.vx *= p.drag; p.vy *= p.drag;
      if (p.sway != null) { p.sway += dt * 2; p.x += Math.sin(p.sway) * 28 * dt; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      const k = p.life / p.max;
      put(fxx, p.img, p.x, p.y, p.size, p.rot, k > .7 ? clamp((1 - k) / .3, 0, 1) : 1);
    }
    resetT(fxx);
  } else if (fxDirty) { fxDirty = false; resetT(fxx); fxx.clearRect(0, 0, W, H); }
}

/* =====================================================
   MODAL + TOAST
   ===================================================== */
const modal = $('#modal'), mTitle = $('#modal-title'), mBody = $('#modal-body'), mCard = $('.modal-card', modal);
let lastFocus = null, onModalClose = null;
function openModal(title, content, cls, cb) {
  closeModal(true);
  lastFocus = document.activeElement;
  mTitle.textContent = title;
  mBody.innerHTML = '';
  if (typeof content === 'string') mBody.innerHTML = content; else mBody.appendChild(content);
  mCard.className = 'modal-card ' + (cls || '');
  mCard.scrollTop = 0;
  onModalClose = cb || null;
  modal.hidden = false;
  document.body.classList.add('noscroll');
  requestAnimationFrame(() => modal.classList.add('show'));
  $('#modal-close').focus();
}
function closeModal(silent) {
  if (modal.hidden) return;
  modal.classList.remove('show');
  modal.hidden = true;
  document.body.classList.remove('noscroll');
  const cb = onModalClose; onModalClose = null;
  if (cb) cb();
  if (!silent && lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* ignorar */ } }
  if (!silent) refreshGifts();
}
let toastT = 0;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600); }
const center = (e) => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

/* =====================================================
   DIBUJO DE PERSONAJES (jirafita y dinosaurio)
   ===================================================== */
function miniTulip(g, x, y, s, rot, c1, c2) {
  g.save(); g.translate(x, y); g.rotate(rot);
  g.strokeStyle = '#3f9d63'; g.lineWidth = 3 * s; g.lineCap = 'round';
  g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -26 * s); g.stroke();
  g.fillStyle = '#4fb872'; g.beginPath(); g.ellipse(-5 * s, -10 * s, 3 * s, 8 * s, -.6, 0, TAU); g.fill();
  g.fillStyle = c1; g.beginPath(); g.moveTo(-7 * s, -26 * s);
  g.quadraticCurveTo(-9 * s, -40 * s, 0, -44 * s); g.quadraticCurveTo(9 * s, -40 * s, 7 * s, -26 * s); g.quadraticCurveTo(0, -20 * s, -7 * s, -26 * s); g.fill();
  g.fillStyle = c2; g.beginPath(); g.moveTo(0, -44 * s); g.quadraticCurveTo(-4 * s, -34 * s, 0, -23 * s); g.quadraticCurveTo(4 * s, -34 * s, 0, -44 * s); g.fill();
  g.restore();
}
function ell(g, x, y, rx, ry, rot) { g.beginPath(); g.ellipse(x, y, rx, ry, rot || 0, 0, TAU); g.fill(); }

function drawGiraffe(g, x, y, s, dir, ph, o) {
  o = o || {};
  const bow = o.bow || 0, mv = o.moving ? 1 : 0, bob = Math.sin(ph * 2) * 1.6 * mv;
  g.save(); g.translate(x, y); g.scale(dir * s, s);
  g.fillStyle = 'rgba(0,0,0,.25)'; ell(g, 0, 2, 50, 8);
  const body = '#ffd36e', spot = '#e08a3c', hoof = '#8a4b2a';
  g.lineCap = 'round'; g.strokeStyle = body; g.lineWidth = 10;
  [[-30, 0], [-16, Math.PI], [18, Math.PI * .5], [32, Math.PI * 1.5]].forEach(([lx, p]) => {
    const sw = Math.sin(ph + p) * 8 * mv;
    g.beginPath(); g.moveTo(lx, -50 + bob); g.lineTo(lx + sw, -5); g.stroke();
    g.fillStyle = hoof; ell(g, lx + sw, -3, 6, 4);
  });
  g.strokeStyle = body; g.lineWidth = 5; g.beginPath(); g.moveTo(-42, -68 + bob);
  g.quadraticCurveTo(-58, -60 + Math.sin(ph * 1.5) * 4 * mv, -56, -42); g.stroke();
  g.fillStyle = hoof; ell(g, -56, -40, 4, 7);
  g.fillStyle = body; ell(g, 0, -64 + bob, 44, 26);
  g.fillStyle = 'rgba(255,255,255,.28)'; ell(g, 4, -54 + bob, 34, 12);
  const a = .3 + bow * .75, bx = 30, by = -78 + bob, L = 64;
  const hx = bx + Math.sin(a) * L, hy = by - Math.cos(a) * L;
  g.strokeStyle = body; g.lineWidth = 22; g.beginPath(); g.moveTo(bx - 2, by + 6); g.lineTo(hx, hy + 6); g.stroke();
  g.fillStyle = spot;
  [[-22, -72, 6], [-4, -58, 5], [14, -76, 6], [-30, -56, 4], [24, -60, 5]].forEach(([sx, sy, r]) => ell(g, sx, sy + bob, r, r * .8, .4));
  for (let i = 1; i <= 3; i++) { const k = i / 4; ell(g, bx + (hx - bx) * k, by + (hy - by) * k + 6, 5, 4, .5); }
  g.save(); g.translate(hx, hy); g.rotate(a * .55);
  g.fillStyle = body; ell(g, 0, 0, 17, 13);
  g.fillStyle = '#ffe9b3'; ell(g, 12, 5, 11, 8);
  g.fillStyle = '#c46a3a'; ell(g, 19, 4, 1.6, 1.3); ell(g, 14, 3, 1.4, 1.2);
  g.fillStyle = body; ell(g, -11, -7, 5, 8, .5);
  g.fillStyle = '#ffb3cf'; ell(g, -11, -7, 2.6, 5, .5);
  g.strokeStyle = '#8a4b2a'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-3, -11); g.lineTo(-6, -22); g.moveTo(5, -12); g.lineTo(6, -23); g.stroke();
  g.fillStyle = hoof; ell(g, -6, -23, 3.2, 3.2); ell(g, 6, -24, 3.2, 3.2);
  if (o.blink) { g.strokeStyle = '#3a1d2a'; g.lineWidth = 2; g.beginPath(); g.arc(5, -3, 3, .2, Math.PI - .2); g.stroke(); }
  else { g.fillStyle = '#2a1330'; ell(g, 5, -3, 2.8, 3.2); g.fillStyle = '#fff'; ell(g, 6, -4, 1, 1); }
  g.fillStyle = 'rgba(255,120,170,.6)'; ell(g, -1, 5, 4, 2.5);
  g.strokeStyle = '#8a4b2a'; g.lineWidth = 1.4; g.beginPath(); g.arc(14, 8, 3, .2, Math.PI - .6); g.stroke();
  if (o.hold === 'tulip') miniTulip(g, 18, 9, .85, .85, '#ff5c9d', '#ffa6cf');
  g.restore();
  g.restore();
}

function drawDino(g, x, y, s, dir, ph, o) {
  o = o || {};
  const mv = o.moving ? 1 : 0, give = o.give || 0, tt = o.t || 0;
  const bob = Math.abs(Math.sin(ph)) * 3 * mv + Math.sin(tt * 2) * .8;
  const body = '#9be8c8', belly = '#fff1d0', spike = '#ff8fc2', dark = '#6fcfa9';
  g.save(); g.translate(x, y); g.scale(dir * s, s);
  g.fillStyle = 'rgba(0,0,0,.25)'; ell(g, 0, 2, 38, 7);
  const wag = Math.sin(tt * 3 + ph) * 5;
  g.fillStyle = body; g.beginPath(); g.moveTo(-24, -40 - bob);
  g.quadraticCurveTo(-66, -46 + wag, -62, -16 + wag); g.quadraticCurveTo(-46, -26, -22, -22); g.closePath(); g.fill();
  g.fillStyle = dark; ell(g, -12, -6 - Math.max(0, Math.sin(ph)) * 3 * mv, 10, 8); ell(g, 14, -6 - Math.max(0, -Math.sin(ph)) * 3 * mv, 10, 8);
  g.fillStyle = body; ell(g, 0, -36 - bob, 34, 28);
  g.fillStyle = belly; ell(g, 7, -30 - bob, 20, 19);
  g.fillStyle = spike;
  for (let i = 0; i < 4; i++) {
    const sx = -22 + i * 13, yt = -36 - bob - 28 * Math.sqrt(Math.max(0, 1 - (sx / 34) * (sx / 34)));
    g.beginPath(); g.moveTo(sx - 6, yt + 4); g.lineTo(sx, yt - 11); g.lineTo(sx + 6, yt + 4); g.closePath(); g.fill();
  }
  g.fillStyle = body; g.beginPath(); g.arc(27, -58 - bob, 23, 0, TAU); g.fill();
  g.fillStyle = spike;
  g.beginPath(); g.moveTo(15, -76 - bob); g.lineTo(19, -90 - bob); g.lineTo(25, -77 - bob); g.fill();
  g.beginPath(); g.moveTo(29, -79 - bob); g.lineTo(34, -92 - bob); g.lineTo(39, -77 - bob); g.fill();
  g.fillStyle = '#2a1330'; ell(g, 20, -62 - bob, 4, 5); ell(g, 36, -62 - bob, 4, 5);
  g.fillStyle = '#fff'; ell(g, 21.2, -63.5 - bob, 1.4, 1.4); ell(g, 37.2, -63.5 - bob, 1.4, 1.4);
  g.fillStyle = 'rgba(255,110,170,.6)'; ell(g, 13, -52 - bob, 5, 3); ell(g, 42, -52 - bob, 5, 3);
  g.strokeStyle = '#3a1d2a'; g.lineWidth = 2; g.lineCap = 'round'; g.beginPath(); g.arc(28, -52 - bob, 5, .15, Math.PI - .15); g.stroke();
  g.fillStyle = dark; ell(g, 30 + give * 10, -30 - bob - give * 3, 8, 5.5, -.3);
  if (o.hold === 'heart') {
    const hs = 12 + give * 3;
    g.fillStyle = '#ff4f93'; heartPath(g, 40 + give * 14, -34 - bob - give * 10, hs); g.fill();
    g.fillStyle = 'rgba(255,255,255,.55)'; ell(g, 36 + give * 14, -40 - bob - give * 10, 3, 2, -.6);
    g.fillStyle = dark; ell(g, 34 + give * 10, -27 - bob - give * 3, 6, 4.5, -.3);
  }
  g.restore();
}

/* =====================================================
   NAVEGACIÓN
   ===================================================== */
const screens = { chest: $('#screen-chest'), letter: $('#screen-letter'), garden: $('#screen-garden') };
let current = 'chest';
function go(name) {
  if (!screens[name]) return;
  closeModal(true);
  if (name === current) { window.scrollTo({ top: 0 }); return; }
  flashNow(); sfx('whoosh');
  setTimeout(() => {
    Object.keys(screens).forEach(k => screens[k].classList.toggle('active', k === name));
    $$('.navbtn').forEach(b => { const on = b.dataset.go === name; b.classList.toggle('active', on); if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    const prev = current; current = name;
    window.scrollTo({ top: 0 });
    try { $('#stage').focus({ preventScroll: true }); } catch (e) { /* ignorar */ }
    if (prev === 'garden') Garden.leave();
    if (name === 'garden') Garden.enter();
    if (name === 'letter') Letter.enter();
  }, 260);
}
function goHome() { if (current !== 'chest') go('chest'); else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); }

/* =====================================================
   SECCIÓN 1: EL COFRE
   ===================================================== */
const chestScr = screens.chest, chestWrap = $('#chest-wrap'), giftsBox = $('#gifts');
function openChest() {
  if (state.chest || chestScr.classList.contains('opening')) return;
  chestScr.classList.add('opening'); chestWrap.classList.add('open'); sfx('open');
  setTimeout(() => { const [cx, cy] = center(chestWrap); flashNow(); burst(cx, cy - 20, { n: 110, power: 460 }); sfx('chime'); }, 700);
  setTimeout(() => {
    state.chest = true; save();
    chestScr.classList.remove('opening'); chestScr.classList.add('opened');
    buildGifts(); giftsBox.hidden = false; giftsBox.classList.add('reveal');
    giftsBox.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, 2300);
}
const GIFTS = [
  { icon: '💖', title: '100 razones para amarte', desc: 'Tarjetas que giran y guardan un motivo cada una.', prog: () => state.reasons.length + '/100 razones', open: openReasons },
  { icon: '🤍', title: 'Mensajes para días difíciles', desc: 'Palabras para cuando necesites recordar cuánto vales.', prog: () => state.hard + ' mensajes leídos', open: openHard },
  { icon: '🌌', title: 'Nuestro universo', desc: 'Un cielo con estrellas que guardan frases de amor.', prog: () => state.stars.length + '/12 estrellas', open: openUniverse },
  { icon: '🦋', title: 'El rincón de Bleach', desc: 'Almas, destinos y promesas con aire de Seireitei.', prog: () => state.bleach.length + '/15 frases', open: openBleach },
  { icon: '🌷', title: 'El jardín de tulipanes', desc: 'Toca cada flor y descubre lo que guarda.', prog: () => state.tulips.length + '/9 flores', open: openTulips },
  { icon: '🦒', title: 'Nuestros pequeños guardianes', desc: 'Una jirafita, un dinosaurio y dos regalos para ti.', prog: () => ((state.guard.flower ? 1 : 0) + (state.guard.note ? 1 : 0)) + '/2 regalos', open: openGuardians }
];
function buildGifts() {
  const grid = $('#gift-grid'); grid.innerHTML = '';
  GIFTS.forEach((g, i) => {
    const b = el('button', 'gift'); b.type = 'button'; b.style.setProperty('--i', i);
    b.appendChild(el('span', 'gi', g.icon)); b.appendChild(el('h3', '', g.title)); b.appendChild(el('p', '', g.desc));
    const p = el('span', 'gp', g.prog()); b.appendChild(p); b._p = p; b._g = g;
    b.addEventListener('click', () => { sfx('pop'); g.open(); });
    grid.appendChild(b);
  });
}
function refreshGifts() { $$('#gift-grid .gift').forEach(b => { b._p.textContent = b._g.prog(); }); }

/* --- Regalo 1: 100 razones --- */
function openReasons() {
  const found = new Set(state.reasons);
  const wrap = document.createElement('div');
  wrap.innerHTML = '<p class="hint">Toca una tarjeta para girarla. Descubiertas: <b id="rc"></b>/100</p><div class="row"><button type="button" class="btn small" id="r-random">✨ Razón sorpresa</button></div><div class="reasons-grid" id="rgrid"></div>';
  openModal('100 razones para amarte', wrap, 'wide');
  const grid = $('#rgrid'), rc = $('#rc'); rc.textContent = found.size;
  const cards = REASONS.map((t, i) => {
    const b = el('button', 'rcard' + (found.has(i) ? ' seen' : '')); b.type = 'button';
    b.setAttribute('aria-label', `Razón número ${i + 1}. Toca para girar la tarjeta`);
    b.innerHTML = '<span class="flip"><span class="face front"><svg viewBox="0 0 32 30" aria-hidden="true"><path d="M16 29C-6 14 2-3 16 8 30-3 38 14 16 29Z"/></svg><small></small></span><span class="face back"><i></i><span></span></span></span>';
    $('small', b).textContent = i + 1; $('i', b).textContent = '#' + (i + 1); $('.back > span', b).textContent = t;
    b.addEventListener('click', () => flip(b, i));
    grid.appendChild(b); return b;
  });
  function flip(b, i) {
    const on = b.classList.toggle('flipped'); b.setAttribute('aria-pressed', String(on)); sfx('flip');
    if (on) {
      b.setAttribute('aria-label', `Razón número ${i + 1}: ${REASONS[i]}`);
      if (!found.has(i)) {
        found.add(i); state.reasons = Array.from(found); save(); rc.textContent = found.size; b.classList.add('seen');
        const [cx, cy] = center(b); burst(cx, cy, { n: 8, power: 150, types: ['h', 's'] });
        if (found.size === 100) setTimeout(() => { toast('¡Las 100! Y aún me quedan infinitas más 💖'); sfx('chime'); const [x, y] = center(mCard); burst(x, y, { n: 90, power: 420 }); }, 700);
      }
    }
  }
  $('#r-random').addEventListener('click', () => {
    const rest = cards.map((c, i) => i).filter(i => !found.has(i));
    const idx = rest.length ? pick(rest) : (Math.random() * 100) | 0;
    cards[idx].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => { if (!cards[idx].classList.contains('flipped')) flip(cards[idx], idx); }, 450);
  });
}

/* --- Regalo 2: mensajes para días difíciles --- */
let hardBag = [];
function openHard() {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<p class="hint">Cuando el día pese demasiado, toca el botón. Aquí hay palabras guardadas para ti.</p><div class="hard-card"><p id="hard-text" aria-live="polite">Respira hondo. Estoy aquí, aunque sea en forma de letras. 🤍</p></div><button type="button" class="btn" id="hard-btn">Necesito un mensaje 💖</button><p class="hint" style="margin-top:14px"><b id="hard-n"></b> mensajes leídos</p>';
  openModal('Mensajes para días difíciles', wrap);
  const txt = $('#hard-text'), n = $('#hard-n'); n.textContent = state.hard;
  $('#hard-btn').addEventListener('click', (e) => {
    if (!hardBag.length) hardBag = shuffle(HARD_DAYS.map((_, i) => i));
    txt.textContent = HARD_DAYS[hardBag.pop()];
    txt.classList.remove('swap'); void txt.offsetWidth; txt.classList.add('swap');
    state.hard++; save(); n.textContent = state.hard; sfx('chime');
    const [cx, cy] = center($('.hard-card', wrap)); burst(cx, cy, { n: 16, power: 220, types: ['h', 's'] });
  });
}

/* --- Regalo 3: nuestro universo --- */
function openUniverse() {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<p class="hint">Toca las estrellas: cada una guarda una frase. <b id="sc"></b>/12 encontradas</p><div class="sky" id="sky"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" id="sky-lines"></svg></div><div class="msgbox" id="sky-msg" aria-live="polite">Elige una estrella ✦</div>';
  openModal('Nuestro universo', wrap, 'wide');
  const sky = $('#sky'), lines = $('#sky-lines'), msg = $('#sky-msg'), sc = $('#sc');
  const found = new Set(state.stars); sc.textContent = found.size;
  function drawLines() {
    const f = SKY.map((s, i) => i).filter(i => found.has(i)); let h = '';
    for (let i = 1; i < f.length; i++) { const a = SKY[f[i - 1]], b = SKY[f[i]]; h += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`; }
    lines.innerHTML = h;
  }
  SKY.forEach((s, i) => {
    const b = el('button', 'skystar' + (found.has(i) ? ' found' : ''), '✦'); b.type = 'button';
    b.style.left = s.x + '%'; b.style.top = s.y + '%'; b.style.setProperty('--d', (i * .35) + 's');
    b.setAttribute('aria-label', `Estrella ${i + 1} de 12`);
    b.addEventListener('click', () => {
      msg.textContent = s.t; msg.classList.remove('swap'); void msg.offsetWidth; msg.classList.add('swap'); sfx('star');
      const [cx, cy] = center(b); burst(cx, cy, { n: 12, power: 160, types: ['s', 'h'], up: 0 });
      if (!found.has(i)) {
        found.add(i); state.stars = Array.from(found); save(); b.classList.add('found'); sc.textContent = found.size; drawLines();
        if (found.size === 12) setTimeout(() => { msg.textContent = '¡Constelación completa! Si unes todas estas estrellas, dibujan lo que siento: algo infinito con tu nombre.'; sfx('chime'); const [x, y] = center(sky); burst(x, y, { n: 80, power: 400 }); }, 1800);
      }
    });
    sky.appendChild(b);
  });
  drawLines();
}

/* --- Regalo 4: rincón de Bleach --- */
function openBleach() {
  const keys = Object.keys(BLEACH); let cur = keys[0], idx = 0;
  const wrap = document.createElement('div');
  wrap.innerHTML = '<p class="hint">Frases originales inspiradas en el mundo de Bleach. <b id="bc"></b>/15 descubiertas</p><div class="tabs" role="tablist" aria-label="Temas" id="b-tabs"></div><div class="bl-card"><div class="big-ic" id="b-ic"></div><h3 id="b-name"></h3><p class="blurb" id="b-blurb"></p><p class="quote" id="b-quote" aria-live="polite"></p><div class="row"><button type="button" class="btn small" id="b-next">Otra frase ✦</button></div></div>';
  openModal('El rincón de Bleach', wrap, 'bleach');
  const tabs = $('#b-tabs'), bc = $('#bc'), quote = $('#b-quote');
  const seen = new Set(state.bleach);
  function render(anim) {
    const d = BLEACH[cur];
    $('#b-ic').textContent = d.icon; $('#b-name').textContent = d.name; $('#b-blurb').textContent = d.blurb; quote.textContent = d.lines[idx];
    if (anim) { quote.classList.remove('swap'); void quote.offsetWidth; quote.classList.add('swap'); }
    const k = cur + ':' + idx;
    if (!seen.has(k)) { seen.add(k); state.bleach = Array.from(seen); save(); }
    bc.textContent = seen.size;
    $$('.tab', tabs).forEach(t => t.setAttribute('aria-selected', String(t.dataset.k === cur)));
  }
  keys.forEach(k => {
    const t = el('button', 'tab', BLEACH[k].icon + ' ' + BLEACH[k].name); t.type = 'button'; t.dataset.k = k; t.setAttribute('role', 'tab');
    t.addEventListener('click', () => { cur = k; idx = 0; sfx('flip'); render(true); });
    tabs.appendChild(t);
  });
  $('#b-next').addEventListener('click', () => {
    idx = (idx + 1) % BLEACH[cur].lines.length; sfx('star'); render(true);
    const [cx, cy] = center($('.bl-card', wrap)); burst(cx, cy, { n: 10, power: 180, types: ['s'], up: 0 });
  });
  render(false);
}

/* --- Regalo 5: jardín de tulipanes --- */
function tulipSVG(c1, c2) {
  return `<svg viewBox="0 0 60 120" aria-hidden="true"><path d="M30 118C30 92 28 70 30 50" stroke="#4fae6b" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M30 96C10 96 6 78 14 70 20 76 26 80 30 82Z" fill="#3f9a5c"/><path d="M30 84C50 84 56 66 48 58 42 64 34 68 30 70Z" fill="#46a863"/><g class="bloom"><path d="M14 30C12 14 20 6 30 4 40 6 48 14 46 30 46 46 38 54 30 54 22 54 14 46 14 30Z" fill="${c1}"/><path d="M30 4C22 14 22 40 30 54 38 40 38 14 30 4Z" fill="${c2}"/></g></svg>`;
}
function openTulips() {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<p class="hint">Toca cada tulipán para que florezca. <b id="tc"></b>/9 descubiertos</p><div class="tulip-field" id="tfield"></div><div class="msgbox" id="t-msg" aria-live="polite">Elige una flor 🌷</div>';
  openModal('El jardín de tulipanes', wrap, 'wide');
  const field = $('#tfield'), msg = $('#t-msg'), tc = $('#tc'), found = new Set(state.tulips); tc.textContent = found.size;
  TULIP_MSGS.forEach((m, i) => {
    const b = el('button', 'tulip' + (found.has(i) ? ' bloomed' : '')); b.type = 'button'; b.style.setProperty('--d', (i * -.5) + 's');
    b.setAttribute('aria-label', `Tulipán ${i + 1} de 9`); b.innerHTML = tulipSVG(TULIP_COLORS[i][0], TULIP_COLORS[i][1]);
    b.addEventListener('click', () => {
      msg.textContent = m; msg.classList.remove('swap'); void msg.offsetWidth; msg.classList.add('swap'); sfx('pop');
      const [cx, cy] = center(b); burst(cx, cy - 30, { n: 14, power: 200, types: ['p', 'h'] });
      b.classList.remove('bloomed'); void b.offsetWidth; b.classList.add('bloomed');
      if (!found.has(i)) { found.add(i); state.tulips = Array.from(found); save(); tc.textContent = found.size; if (found.size === 9) setTimeout(() => { toast('¡Todo el jardín floreció para ti! 🌷'); sfx('chime'); }, 800); }
    });
    field.appendChild(b);
  });
}

/* --- Regalo 6: pequeños guardianes --- */
function openGuardians() {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<p class="hint">Ellos cuidan este cofre. Toca los botones para recibir lo que traen para ti.</p><div class="guards"><div class="guard"><h3>La jirafita</h3><canvas id="cv-g" aria-label="Una jirafita caricaturesca sosteniendo un tulipán rosado" role="img"></canvas><button type="button" class="btn small" id="g-btn">Recibir la flor 🌷</button></div><div class="guard"><h3>El dinosaurio</h3><canvas id="cv-d" aria-label="Un dinosaurio adorable sosteniendo un corazón" role="img"></canvas><button type="button" class="btn small" id="d-btn">Recibir la carta 💌</button></div></div><div id="g-out" aria-live="polite"></div>';
  let raf = 0, running = true;
  openModal('Nuestros pequeños guardianes', wrap, 'wide', () => { running = false; cancelAnimationFrame(raf); });
  const cg = $('#cv-g'), cd = $('#cv-d'), out = $('#g-out'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  [cg, cd].forEach(c => { c.width = 220 * dpr; c.height = 250 * dpr; });
  const gg = cg.getContext('2d'), gd = cd.getContext('2d');
  let bowT = -1, giveT = -1, t0 = performance.now(), lastF = 0;
  function loop(now) {
    if (!running) return; raf = requestAnimationFrame(loop);
    if (now - lastF < 30) return; lastF = now;
    const t = (now - t0) / 1000;
    let bow = 0; if (bowT >= 0) { bowT += .03; bow = Math.sin(clamp(bowT, 0, 1) * Math.PI); if (bowT >= 1) bowT = -1; }
    let give = 0; if (giveT >= 0) { giveT += .03; give = Math.sin(clamp(giveT, 0, 1) * Math.PI); if (giveT >= 1) giveT = -1; }
    gg.setTransform(dpr, 0, 0, dpr, 0, 0); gg.clearRect(0, 0, 220, 250);
    drawGiraffe(gg, 100, 232, 1.2, 1, t * 3, { hold: 'tulip', bow, blink: Math.sin(t * 1.7) > .97 });
    gd.setTransform(dpr, 0, 0, dpr, 0, 0); gd.clearRect(0, 0, 220, 250);
    drawDino(gd, 100, 228, 1.7, 1, t * 3, { hold: 'heart', give, t });
  }
  raf = requestAnimationFrame(loop);
  const fly = (from, emoji, tx, ty) => { const f = el('div', 'fly', emoji); const gcard = from.parentElement; f.style.left = '50%'; f.style.top = '40%'; f.style.setProperty('--fx', tx + 'px'); f.style.setProperty('--fy', ty + 'px'); gcard.appendChild(f); setTimeout(() => f.remove(), 1400); };
  $('#g-btn').addEventListener('click', () => {
    bowT = 0; sfx('pop'); fly(cg, '🌷', 0, 110);
    setTimeout(() => {
      out.innerHTML = ''; const box = el('div', 'msgbox swap'); const p = el('p', '', GIRAFFE_MSG); box.appendChild(p); out.appendChild(box);
      const [cx, cy] = center(box); burst(cx, cy, { n: 30, power: 260, types: ['p', 'h'] }); sfx('chime');
      if (!state.guard.flower) { state.guard.flower = true; save(); toast('Recibiste un tulipán rosado 🌷'); }
      box.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }, 900);
  });
  $('#d-btn').addEventListener('click', () => {
    giveT = 0; sfx('pop'); fly(cd, '💌', 0, 110);
    setTimeout(() => {
      out.innerHTML = ''; const note = el('div', 'note');
      DINO_NOTE.forEach((l, i) => { const p = el('p', '', l); p.style.margin = '6px 0'; if (i === 0 || i === DINO_NOTE.length - 1) p.style.fontWeight = '600'; note.appendChild(p); });
      out.appendChild(note); const [cx, cy] = center(note); burst(cx, cy, { n: 30, power: 260, types: ['h', 's'] }); sfx('chime');
      if (!state.guard.note) { state.guard.note = true; save(); toast('Recibiste una cartita 💌'); }
      note.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }, 900);
  });
}

/* =====================================================
   SECCIÓN 2: LA CARTA
   ===================================================== */
const Letter = (() => {
  const env = $('#envelope'), stage = $('#env-stage'), paper = $('#paper'), txt = $('#paper-text'), intro = $('#letter-intro');
  function build(instant) {
    txt.innerHTML = '';
    const all = LETTER.concat([SIGN]);
    all.forEach((p, i) => {
      const e = el('p', i === 0 ? 'greet' : (i === all.length - 1 ? 'sign' : ''), p);
      e.style.animationDelay = (1.2 + i * 1.6) + 's'; txt.appendChild(e);
    });
    paper.classList.toggle('instant', !!instant);
    $('#btn-skip-letter').hidden = !!instant;
  }
  function showPaper(instant) {
    intro.hidden = true; stage.hidden = true; paper.hidden = false;
    paper.style.animation = 'none'; void paper.offsetWidth; paper.style.animation = '';
    build(instant); try { paper.focus({ preventScroll: true }); } catch (e) { /* ignorar */ }
  }
  function open() {
    if (env.classList.contains('open')) return;
    env.classList.add('open'); sfx('open');
    setTimeout(() => { const [cx, cy] = center(env); burst(cx, cy, { n: 50, power: 300, types: ['h', 'p', 's'] }); sfx('chime'); }, 600);
    setTimeout(() => { state.letter = true; save(); showPaper(false); paper.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }, 1900);
  }
  function enter() { if (state.letter && paper.hidden) showPaper(true); }
  $('#btn-open-letter').addEventListener('click', open);
  $('#btn-skip-letter').addEventListener('click', () => { paper.classList.add('instant'); $('#btn-skip-letter').hidden = true; });
  $('#btn-reread').addEventListener('click', () => { sfx('whoosh'); showPaper(false); });
  $('#btn-letter-chest').addEventListener('click', () => go('chest'));
  return { enter };
})();

/* =====================================================
   SECCIÓN 3: EL JARDÍN NOCTURNO
   ===================================================== */
const Garden = (() => {
  const cv = $('#garden'), g = cv.getContext('2d'), wrap = $('#garden-wrap'), layer = $('#garden-objects');
  let gW = 0, gH = 0, dpr = 1, running = false, raf = 0, lastT = 0, T = 0, bgLayer = null;
  let phase = state.done ? 'done' : 'play', sky = state.done ? 1 : 0, skyTarget = sky, heartTimer = 0, mark = null;
  const giraffe = { x: 0, y: 0, tx: 0, ty: 0, dir: 1, moving: false, ph: 0, onArrive: null };
  const dino = { x: 0, y: 0, dir: 1, moving: false, ph: 0, manual: null };
  let gStars = [], flies = [], drops = [], dropAcc = 0, tulips = [], objBtns = [];
  const TULIP_POS = [[.06, .8], [.1, .92], [.2, .74], [.36, .92], [.41, .7], [.6, .7], [.66, .92], [.74, .76], [.92, .88], [.94, .72], [.54, .94], [.3, .67], [.78, .67], [.04, .68], [.22, .9], [.84, .94]];

  function minY() { return gH * .68; } function maxY() { return gH * .94; }
  function charScale(y) { const base = clamp(gH / 700, .5, 1); return base * (.8 + .3 * clamp((y - minY()) / (maxY() - minY()), 0, 1)); }

  function paintBg() {
    bgLayer = document.createElement('canvas'); bgLayer.width = Math.floor(gW * dpr); bgLayer.height = Math.floor(gH * dpr);
    const c = bgLayer.getContext('2d'); c.scale(dpr, dpr);
    const hz = gH * .58;
    let gr = c.createLinearGradient(0, 0, 0, hz);
    gr.addColorStop(0, '#090626'); gr.addColorStop(.5, '#241160'); gr.addColorStop(.85, '#7b3a9e'); gr.addColorStop(1, '#ff9cc4');
    c.fillStyle = gr; c.fillRect(0, 0, gW, hz + 2);
    const gal = (x, y, r, col) => { const q = c.createRadialGradient(x, y, 0, x, y, r); q.addColorStop(0, col); q.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = q; c.fillRect(x - r, y - r, r * 2, r * 2); };
    gal(gW * .25, gH * .18, gW * .3, 'rgba(120,90,255,.35)'); gal(gW * .55, gH * .3, gW * .28, 'rgba(255,110,190,.22)'); gal(gW * .1, gH * .35, gW * .2, 'rgba(80,190,255,.2)');
    [['#2c1a66', 1, .05], ['#3b2780', 2.3, .03]].forEach(([col, ph, amp]) => {
      c.fillStyle = col; c.beginPath(); c.moveTo(0, hz + 6);
      for (let x = 0; x <= gW + 1; x += gW / 14) c.lineTo(x, hz - gH * amp - Math.sin(x * .008 * ph + ph) * gH * .035);
      c.lineTo(gW, hz + 6); c.closePath(); c.fill();
    });
    gr = c.createLinearGradient(0, hz, 0, gH); gr.addColorStop(0, '#3a8a6a'); gr.addColorStop(.5, '#256b5a'); gr.addColorStop(1, '#14403f');
    c.fillStyle = gr; c.fillRect(0, hz, gW, gH - hz);
    const pg = c.createRadialGradient(gW * .5, gH * .78, 0, gW * .5, gH * .78, gW * .38); pg.addColorStop(0, 'rgba(160,220,255,.28)'); pg.addColorStop(1, 'rgba(160,220,255,0)');
    c.fillStyle = pg; c.fillRect(0, hz, gW, gH - hz);
    // árbol
    const tx = gW * .1, tb = gH * .68, th = gH * .3;
    c.fillStyle = '#4a2c4f'; c.beginPath(); c.moveTo(tx - 12, tb); c.quadraticCurveTo(tx - 6, tb - th * .5, tx - 5, tb - th * .8); c.lineTo(tx + 5, tb - th * .8); c.quadraticCurveTo(tx + 6, tb - th * .5, tx + 12, tb); c.fill();
    c.fillStyle = '#2d7a63';
    [[0, -th * .95, .2], [-.12, -th * .78, .16], [.12, -th * .78, .16], [0, -th * .7, .16]].forEach(([ox, oy, r]) => { c.beginPath(); c.arc(tx + ox * gW, tb + oy, r * gH, 0, TAU); c.fill(); });
    c.fillStyle = '#ff9cc4';
    for (let i = 0; i < 26; i++) { c.beginPath(); c.arc(tx + rand(-.2, .2) * gW, tb - th * rand(.55, 1.1), rand(2, 4), 0, TAU); c.fill(); }
    // pasto
    c.strokeStyle = 'rgba(120,230,160,.35)'; c.lineWidth = 1.4;
    for (let i = 0; i < 160; i++) { const x = rand(0, gW), y = rand(hz + 8, gH), h = rand(5, 12); c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + rand(-3, 3), y - h * .6, x + rand(-4, 4), y - h); c.stroke(); }
  }

  function resize() {
    const w = wrap.clientWidth, h = wrap.clientHeight; if (!w || !h) return;
    const sx = gW ? w / gW : 1, sy = gH ? h / gH : 1;
    gW = w; gH = h; dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    cv.width = Math.floor(gW * dpr); cv.height = Math.floor(gH * dpr);
    if (!giraffe.x) { giraffe.x = giraffe.tx = gW * .3; giraffe.y = giraffe.ty = gH * .84; dino.x = gW * .2; dino.y = gH * .86; }
    else { [giraffe, dino].forEach(c => { c.x *= sx; c.y *= sy; }); giraffe.tx *= sx; giraffe.ty *= sy; }
    gStars = Array.from({ length: clamp(Math.floor(gW * gH / 5000), 40, 110) }, () => ({ x: rand(0, gW), y: rand(0, gH * .55), r: rand(.5, 1.7), p: rand(0, TAU), s: rand(.6, 2) }));
    if (!flies.length) flies = Array.from({ length: gW < 600 ? 14 : 24 }, () => ({ x: rand(0, gW), y: rand(gH * .5, gH * .95), a: rand(0, TAU), v: rand(10, 24), p: rand(0, TAU) }));
    tulips = TULIP_POS.map(([x, y], i) => ({ fx: x, fy: y, ph: rand(0, TAU), s: rand(.8, 1.15), c: TULIP_COLORS[i % TULIP_COLORS.length] }));
    paintBg();
  }

  /* objetos escondidos (botones accesibles) */
  function buildObjects() {
    layer.innerHTML = ''; objBtns = [];
    GARDEN_ITEMS.forEach((o, i) => {
      const b = el('button', 'gobj'); b.type = 'button'; b.style.left = (o.x * 100) + '%'; b.style.top = (o.y * 100) + '%'; b.style.setProperty('--d', (i * .4) + 's');
      b.setAttribute('aria-label', `Objeto brillante: ${o.name}`); b.appendChild(el('span', '', o.icon));
      if (state.found.includes(o.id)) b.classList.add('found');
      b.addEventListener('click', (e) => {
        e.stopPropagation(); if (phase === 'finale') return;
        if (state.found.includes(o.id)) { showObject(o, false); return; }
        walkTo(o.x * gW, clamp(o.y * gH + 24, minY(), maxY()), () => discover(o));
      });
      layer.appendChild(b); objBtns.push(b);
    });
  }
  function updateHUD() {
    const n = state.found.length; $('#g-count').textContent = `🔎 ${n} / 5 objetos`;
    const slots = $('#g-slots'); slots.innerHTML = '';
    GARDEN_ITEMS.forEach(o => { const s = el('span', 'slot' + (state.found.includes(o.id) ? ' on' : ''), state.found.includes(o.id) ? o.icon : '?'); slots.appendChild(s); });
    $('#g-hint').textContent = n === 0 ? 'Toca el suelo para caminar y busca lo que brille ✨' : n < 5 ? `Te faltan ${5 - n}. ¡Sigue explorando!` : '¡Encontraste los cinco tesoros!';
    $('#btn-g-final').hidden = !state.done;
  }
  function showObject(o, first, cb) {
    const box = document.createElement('div'); box.className = 'obj-msg';
    box.appendChild(el('div', 'big', o.icon)); box.appendChild(el('p', '', o.msg));
    if (first) box.appendChild(el('p', '', `Descubriste ${state.found.length} de 5 tesoros ✨`));
    openModal(o.name, box, '', cb);
  }
  function discover(o) {
    if (state.found.includes(o.id)) return;
    state.found.push(o.id); save(); sfx('chime');
    const idx = GARDEN_ITEMS.indexOf(o); objBtns[idx].classList.add('found');
    const r = objBtns[idx].getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, { n: 40, power: 300 });
    updateHUD();
    showObject(o, true, () => { if (state.found.length === 5 && phase === 'play') startFinale(); });
  }
  function walkTo(x, y, cb) { giraffe.tx = clamp(x, gW * .04, gW * .96); giraffe.ty = clamp(y, minY(), maxY()); giraffe.onArrive = cb || null; mark = { x: giraffe.tx, y: giraffe.ty, t: 0 }; }

  /* final */
  function startFinale() {
    phase = 'finale'; layer.classList.add('dim'); giraffe.onArrive = null;
    flashNow(); sfx('chime'); skyTarget = 1;
    setTimeout(() => { petalRain(260, 5); sfx('sparkle'); }, 500);
    setTimeout(() => { giraffe.tx = gW * .43; giraffe.ty = gH * .84; giraffe.onArrive = null; dino.manual = { x: gW * .57, y: gH * .84 }; }, 1300);
    setTimeout(() => {
      heartTimer = setInterval(() => { if (phase !== 'finale') return; const r = cv.getBoundingClientRect(); burst(r.left + gW * .5, r.top + gH * .6, { n: 5, power: 140, types: ['h'], up: 140 }); }, 800);
    }, 2800);
    setTimeout(() => { const gb = $('#goldbox'); gb.hidden = false; requestAnimationFrame(() => gb.classList.add('show')); sfx('star'); }, 5200);
  }
  function openGoldBox() {
    const gb = $('#goldbox'); if (gb.classList.contains('open')) return;
    gb.classList.add('open'); sfx('open'); $('#btn-goldbox').hidden = true;
    const r = gb.getBoundingClientRect(); setTimeout(() => burst(r.left + r.width / 2, r.top + r.height * .4, { n: 90, power: 420, types: ['s', 'h', 'p'] }), 500);
    setTimeout(showFinal, 1700);
  }
  function showFinal() {
    state.done = true; save(); phase = 'done';
    const box = el('div', 'final-text');
    FINAL.forEach((p, i) => { const e = el('p', i === 0 || i === FINAL.length - 1 ? (i === 0 ? 'greet' : 'sign') : '', p); e.style.animationDelay = (.6 + i * 1.5) + 's'; box.appendChild(e); });
    openModal('Una declaración para ti', box, 'final', () => {
      clearInterval(heartTimer); const gb = $('#goldbox'); gb.hidden = true; gb.classList.remove('show', 'open'); $('#btn-goldbox').hidden = false;
      dino.manual = null; updateHUD();
    });
    sfx('chime');
  }

  /* bucle del jardín */
  function stepChar(c, tx, ty, sp, dt) {
    const dx = tx - c.x, dy = ty - c.y, d = Math.hypot(dx, dy);
    if (d < 5) { c.moving = false; return true; }
    const k = Math.min(d, sp * dt) / d; c.x += dx * k; c.y += dy * k;
    if (Math.abs(dx) > 2) c.dir = dx > 0 ? 1 : -1; c.moving = true; return false;
  }
  function update(dt) {
    T += dt; sky += (skyTarget - sky) * Math.min(1, dt * 1.2);
    const arrived = stepChar(giraffe, giraffe.tx, giraffe.ty, 210 * clamp(gH / 600, .7, 1.2), dt);
    if (arrived && giraffe.onArrive) { const f = giraffe.onArrive; giraffe.onArrive = null; f(); }
    if (dino.manual) stepChar(dino, dino.manual.x, dino.manual.y, 170, dt);
    else {
      const bx = giraffe.x - giraffe.dir * 58 * charScale(giraffe.y) / .9, by = clamp(giraffe.y + 6, minY(), maxY());
      const dist = Math.hypot(bx - dino.x, by - dino.y);
      if (dist > 26) stepChar(dino, bx, by, 190, dt); else dino.moving = false;
    }
    if (phase === 'finale' || phase === 'done') { if (!giraffe.moving && dino.manual && !dino.moving) { giraffe.dir = 1; dino.dir = -1; } }
    giraffe.ph += dt * (giraffe.moving ? 9 : 0); dino.ph += dt * (dino.moving ? 11 : 0);
    flies.forEach(f => { f.p += dt * 3; f.a += rand(-1, 1) * dt * 3; f.x += Math.cos(f.a) * f.v * dt; f.y += Math.sin(f.a) * f.v * dt; if (f.x < 0) f.x = gW; if (f.x > gW) f.x = 0; if (f.y < gH * .45) f.y = gH * .45; if (f.y > gH) f.y = gH * .5; });
    const fx0 = gW * .5, fy0 = gH * .74, fs = clamp(gH / 600, .6, 1.1);
    dropAcc += dt * 42;
    while (dropAcc > 1) { dropAcc--; if (drops.length < 90) drops.push({ x: fx0 + rand(-3, 3) * fs, y: fy0 - 58 * fs, vx: rand(-34, 34) * fs, vy: rand(-170, -120) * fs, s: fs }); }
    for (let i = drops.length - 1; i >= 0; i--) { const d = drops[i]; d.vy += 300 * d.s * dt; d.x += d.vx * dt; d.y += d.vy * dt; if (d.y > fy0 - 6 * d.s) drops.splice(i, 1); }
    if (mark) { mark.t += dt; if (mark.t > .7) mark = null; }
    // proximidad
    objBtns.forEach((b, i) => { const o = GARDEN_ITEMS[i]; b.classList.toggle('near', Math.abs(o.x * gW - giraffe.x) < 150 && !state.found.includes(o.id)); });
  }

  function gTulip(x, y, s, sway, c) {
    const hx = x + sway * 5 * s, hy = y - 44 * s;
    g.strokeStyle = '#3f9d63'; g.lineWidth = 3 * s; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + sway * 2 * s, y - 24 * s, hx, hy + 4 * s); g.stroke();
    g.fillStyle = '#4fb872';
    g.beginPath(); g.moveTo(x, y - 4 * s); g.quadraticCurveTo(x - 16 * s, y - 20 * s, x - 10 * s, y - 32 * s); g.quadraticCurveTo(x - 4 * s, y - 18 * s, x, y - 4 * s); g.fill();
    g.beginPath(); g.moveTo(x, y - 6 * s); g.quadraticCurveTo(x + 16 * s, y - 18 * s, x + 11 * s, y - 28 * s); g.quadraticCurveTo(x + 5 * s, y - 16 * s, x, y - 6 * s); g.fill();
    g.globalAlpha = .5; g.drawImage(SPR.glowPink, hx - 24 * s, hy - 34 * s, 48 * s, 48 * s); g.globalAlpha = 1;
    g.save(); g.translate(hx, hy + 20 * s); g.rotate(sway * .09); g.translate(-hx, -(hy + 20 * s));
    const ox = hx, oy = hy + 22 * s;
    g.fillStyle = c[0]; g.beginPath(); g.moveTo(ox - 8 * s, oy - 4 * s); g.quadraticCurveTo(ox - 10 * s, oy - 20 * s, ox, oy - 24 * s); g.quadraticCurveTo(ox + 10 * s, oy - 20 * s, ox + 8 * s, oy - 4 * s); g.quadraticCurveTo(ox, oy + 4 * s, ox - 8 * s, oy - 4 * s); g.fill();
    g.fillStyle = c[1]; g.beginPath(); g.moveTo(ox, oy - 24 * s); g.quadraticCurveTo(ox - 4 * s, oy - 12 * s, ox, oy); g.quadraticCurveTo(ox + 4 * s, oy - 12 * s, ox, oy - 24 * s); g.fill();
    g.restore();
  }
  function gFountain(x, y, s) {
    g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, y + 6 * s, 90 * s, 22 * s, 0, 0, TAU); g.fill();
    g.globalAlpha = .55 + .2 * Math.sin(T * 2); g.drawImage(SPR.glowBlue, x - 110 * s, y - 120 * s, 220 * s, 170 * s); g.globalAlpha = 1;
    g.fillStyle = '#b9a8f0'; g.beginPath(); g.ellipse(x, y, 84 * s, 26 * s, 0, 0, TAU); g.fill();
    g.fillStyle = '#e6dcff'; g.beginPath(); g.ellipse(x, y - 4 * s, 78 * s, 22 * s, 0, 0, TAU); g.fill();
    const wg = g.createLinearGradient(0, y - 22 * s, 0, y + 8 * s); wg.addColorStop(0, '#9be4ff'); wg.addColorStop(1, '#4cb5ee');
    g.fillStyle = wg; g.beginPath(); g.ellipse(x, y - 6 * s, 68 * s, 17 * s, 0, 0, TAU); g.fill();
    g.strokeStyle = `rgba(255,255,255,${.3 + .25 * Math.sin(T * 3)})`; g.lineWidth = 1.5; g.beginPath(); g.ellipse(x, y - 6 * s, 48 * s + Math.sin(T * 2) * 4, 11 * s, 0, 0, TAU); g.stroke();
    g.fillStyle = '#cdbcff'; g.fillRect(x - 7 * s, y - 52 * s, 14 * s, 46 * s);
    g.fillStyle = '#e6dcff'; g.beginPath(); g.ellipse(x, y - 52 * s, 32 * s, 10 * s, 0, 0, TAU); g.fill();
    g.fillStyle = '#7fd6ff'; g.beginPath(); g.ellipse(x, y - 54 * s, 26 * s, 7 * s, 0, 0, TAU); g.fill();
    g.fillStyle = 'rgba(200,240,255,.85)'; drops.forEach(d => { g.beginPath(); g.arc(d.x, d.y, 2 * s, 0, TAU); g.fill(); });
  }
  function draw() {
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, gW, gH);
    g.drawImage(bgLayer, 0, 0, gW, gH);
    if (sky > .01) {
      const gr = g.createLinearGradient(0, 0, 0, gH * .6); gr.addColorStop(0, `rgba(255,190,225,${.5 * sky})`); gr.addColorStop(1, `rgba(255,230,170,${.38 * sky})`);
      g.fillStyle = gr; g.fillRect(0, 0, gW, gH * .6);
    }
    gStars.forEach(s => { s.p += .03 * s.s; g.globalAlpha = (.3 + .7 * Math.abs(Math.sin(s.p))) * (1 - sky * .5); g.fillStyle = '#fff'; g.beginPath(); g.arc(s.x, s.y, s.r, 0, TAU); g.fill(); });
    g.globalAlpha = 1;
    // luna
    const mx = gW * .82, my = gH * .17, mr = Math.min(gW, gH) * .075;
    g.globalAlpha = .7 + .2 * Math.sin(T * 1.4) + sky * .2; g.drawImage(SPR.glowGold, mx - mr * 4, my - mr * 4, mr * 8, mr * 8); g.globalAlpha = 1;
    const mg = g.createRadialGradient(mx - mr * .3, my - mr * .3, 0, mx, my, mr); mg.addColorStop(0, '#fffdf0'); mg.addColorStop(1, '#ffe9a8');
    g.fillStyle = mg; g.beginPath(); g.arc(mx, my, mr, 0, TAU); g.fill();
    g.fillStyle = 'rgba(220,190,120,.3)'; [[-.3, -.2, .18], [.25, .1, .22], [-.1, .4, .12]].forEach(([a, b, r]) => { g.beginPath(); g.arc(mx + a * mr, my + b * mr, r * mr, 0, TAU); g.fill(); });
    // dibujables ordenados por profundidad
    const list = [];
    tulips.forEach(t => list.push({ y: t.fy * gH, f: () => gTulip(t.fx * gW, t.fy * gH, t.s * clamp(gH / 600, .6, 1.2) * (.8 + .3 * t.fy), Math.sin(T * 1.6 + t.ph), t.c) }));
    list.push({ y: gH * .74, f: () => gFountain(gW * .5, gH * .74, clamp(gH / 600, .6, 1.1)) });
    list.push({ y: giraffe.y, f: () => drawGiraffe(g, giraffe.x, giraffe.y, charScale(giraffe.y) * .95, giraffe.dir, giraffe.ph, { moving: giraffe.moving, blink: Math.sin(T * 1.3) > .97, hold: phase === 'finale' || phase === 'done' ? 'tulip' : null }) });
    list.push({ y: dino.y, f: () => drawDino(g, dino.x, dino.y, charScale(dino.y) * 1.05, dino.dir, dino.ph, { moving: dino.moving, t: T, hold: phase === 'finale' || phase === 'done' ? 'heart' : null }) });
    list.sort((a, b) => a.y - b.y).forEach(i => i.f());
    // luciérnagas
    flies.forEach(f => { g.globalAlpha = .4 + .6 * Math.abs(Math.sin(f.p)); g.drawImage(SPR.glowFly, f.x - 9, f.y - 9, 18, 18); });
    g.globalAlpha = 1;
    if (mark) { g.strokeStyle = `rgba(255,240,170,${1 - mark.t / .7})`; g.lineWidth = 2; g.beginPath(); g.ellipse(mark.x, mark.y, 8 + mark.t * 40, (8 + mark.t * 40) * .4, 0, 0, TAU); g.stroke(); }
  }
  function loop(now) {
    if (!running) return; raf = requestAnimationFrame(loop);
    const dtms = now - lastT; if (dtms < 25) return; lastT = now;
    update(Math.min(dtms / 1000, .05)); draw();
  }
  function enter() {
    gardenActive = true;
    if (!layer.children.length) buildObjects();
    resize(); updateHUD();
    if (state.done) { sky = skyTarget = 1; }
    if (!running) { running = true; lastT = performance.now(); raf = requestAnimationFrame(loop); }
    if (!state.intro && !state.found.length) { $('#g-intro').hidden = false; }
  }
  function leave() { gardenActive = false; running = false; cancelAnimationFrame(raf); }

  cv.addEventListener('pointerdown', (e) => {
    if (phase === 'finale') return;
    const r = cv.getBoundingClientRect(); walkTo(e.clientX - r.left, e.clientY - r.top, null); sfx('click');
  });
  window.addEventListener('keydown', (e) => {
    if (current !== 'garden' || !modal.hidden || phase === 'finale' || !$('#g-intro').hidden) return;
    const st = 110; let dx = 0, dy = 0;
    if (e.key === 'ArrowLeft') dx = -st; else if (e.key === 'ArrowRight') dx = st; else if (e.key === 'ArrowUp') dy = -st * .6; else if (e.key === 'ArrowDown') dy = st * .6; else return;
    e.preventDefault(); walkTo(giraffe.x + dx, giraffe.y + dy, null);
  });
  $('#btn-g-start').addEventListener('click', () => { state.intro = true; save(); $('#g-intro').hidden = true; sfx('chime'); });
  $('#btn-g-help').addEventListener('click', () => { $('#g-intro').hidden = false; });
  $('#btn-goldbox').addEventListener('click', openGoldBox);
  $('#btn-g-final').addEventListener('click', showFinal);
  $('#btn-journal').addEventListener('click', () => {
    const box = document.createElement('div');
    if (!state.found.length) box.appendChild(el('p', 'hint', 'Aún no has encontrado ningún objeto. ¡Explora el jardín!'));
    GARDEN_ITEMS.filter(o => state.found.includes(o.id)).forEach(o => {
      const it = el('div', 'journal-item'); it.appendChild(el('div', 'ji', o.icon));
      const t = el('div'); t.appendChild(el('h3', '', o.name)); const p = el('p', '', o.msg); p.style.fontSize = '.98rem'; t.appendChild(p); it.appendChild(t); box.appendChild(it);
    });
    openModal('Mensajes del jardín', box);
  });
  window.addEventListener('resize', () => { if (running) resize(); });
  return { enter, leave };
})();

/* =====================================================
   ARRANQUE
   ===================================================== */
$('#btn-open-chest').addEventListener('click', openChest);
$('#btn-home').addEventListener('click', goHome);
$('#btn-sound').addEventListener('click', () => { state.sound = !state.sound; save(); syncSoundBtn(); if (state.sound) sfx('pop'); });
$$('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
$('#modal-close').addEventListener('click', () => closeModal());
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
  if (e.key === 'Tab' && !modal.hidden) {
    const f = $$('button,[href],input,[tabindex]:not([tabindex="-1"])', mCard).filter(x => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], lastEl = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
  }
});
let resizeTimer = 0;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeFx, 150); });

/* =====================================================
   MÚSICA DE FONDO (opcional)
   ===================================================== */
const bgm = $('#music'); bgm.volume = .35;
function syncMusicBtn() {
  const b = $('#btn-music'), on = state.music && !bgm.paused;
  b.setAttribute('aria-pressed', String(on));
  b.style.opacity = on ? '1' : '.6';
  b.setAttribute('aria-label', on ? 'Música encendida. Toca para pausar' : 'Música apagada. Toca para encender');
}
function playMusic() { if (!state.music) return; const p = bgm.play(); if (p && p.then) p.then(syncMusicBtn).catch(() => syncMusicBtn()); }
$('#btn-music').addEventListener('click', () => {
  if (!bgm.paused) { bgm.pause(); state.music = false; } else { state.music = true; playMusic(); }
  save(); syncMusicBtn();
});
bgm.addEventListener('pause', syncMusicBtn); bgm.addEventListener('play', syncMusicBtn);
/* los navegadores exigen un toque antes de reproducir: arranca con la primera interacción */
['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, function first() {
  window.removeEventListener('pointerdown', first); window.removeEventListener('keydown', first); playMusic();
}, { once: false }));
document.addEventListener('visibilitychange', () => { if (document.hidden) bgm.pause(); else if (state.music && started) playMusic(); });
let started = false; window.addEventListener('pointerdown', () => { started = true; }, { once: true });
syncMusicBtn();
syncSoundBtn();
resizeFx();
requestAnimationFrame(frame);

if (state.chest) {
  chestScr.classList.add('opened', 'instant'); chestWrap.classList.add('open');
  buildGifts(); giftsBox.hidden = false;
  setTimeout(() => chestScr.classList.remove('instant'), 200);
}
})();
