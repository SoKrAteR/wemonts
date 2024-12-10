const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ru", "en", "de"];
const currentPathName = window.location.pathname;
let currentLang =
	localStorage.getItem("language") || checkBrowserLang() || "ru";
let currentTexts = {};

const homeTexts = {
	"home_page-1": {
		ru: "КОНТАКТЫ",
		en: "CONTACTS",
		de: "KONTAKTI",
	},
	"home_page-2": {
		ru: "ГАЛЕРЕЯ",
		en: "GALLERY",
		de: "GALERIJA",
	},
	"home_page-3": {
		ru: "ДОМ",
		en: "HOME",
		de: "SĀKUMS",
	},
	"home_page-4": {
		ru: "О нас:",
		en: "About us",
		de: "Par mums:",
	},
	"home_page-5": {
		ru: "Наша компания объединяет профессионалов в области сварки и монтажа оборудования с более чем 10ти-летним опытом и подтвержденным высоким уровнем мастерства.",
		en: "Our company brings together professionals in welding and equipment installation with over 10 years of experience and proven high-level expertise.",
		de: "Mūsu uzņēmums apvieno metināšanas un iekārtu montāžas jomas profesionāļus ar vairāk nekā 10 gadu pieredzi un apliecinātu augstu kvalifikāciju.",
	},
	"home_page-6": {
		ru: "Мы предлагаем:",
		en: "We offer",
		de: "Mēs piedāvājam:",
	},
	"home_page-7": {
		ru: "Сварочные работы:",
		en: "Welding services:",
		de: "Metināšanas darbi:",
	},
	"home_page-8": {
		ru: "По нержавеющей стали различных марок в среде аргона.",
		en: "Welding of various grades of stainless steel in an argon environment.",
		de: "Dažādu marku nerūsējošā tērauda metināšana argona vidē.",
	},
	"home_page-9": {
		ru: "По углеродистой стали.",
		en: "Welding of carbon steel.",
		de: "Oglekļa tērauda metināšana.",
	},
	"home_page-10": {
		ru: "Монтаж и электромонтаж:",
		en: "Installation and electrical installation:",
		de: "Montāža un elektroinstalācija:",
	},
	"home_page-11": {
		ru: "Технологического оборудования, в том числе пищевого оборудования, резервуаров, сантехнических и пожарных узлов, технологических и сервисных трубопроводов.",
		en: "Technological equipment, including food processing equipment, tanks, plumbing and fire protection systems, as well as technological and service pipelines.",
		de: "Tehnoloģisko iekārtu, tostarp pārtikas pārstrādes un ražošans iekārtu, tvertnņu, santehnikas un ugunsdrošības sistēmu, kā arī tehnoloģisku un apkalpošanas cauruļvadu montāža.",
	},
	"home_page-12": {
		ru: "Металлоконструкций эстакад, платформ под установку оборудования, прокладку трубопроводов.",
		en: "Metal structures for racks, platforms for equipment installation, and pipeline routing.",
		de: "Metāla konstrukciju plauktu, iekārtu uzstādīšanas platformu montāža, ka arī un cauruļvadu ieklāšana.",
	},
	"home_page-13": {
		ru: "Обвязка оборудования технологическими трубопроводами из нержавеющей стали.",
		en: "Equipment piping with stainless steel technological pipelines.",
		de: "Aprīkojuma savienošana ar nerūsējošā tērauda tehnoloģiskiem cauruļvadiem.",
	},
	"home_page-14": {
		ru: "Прокладка кабельных трасс, кабелей, монтаж КИПиА, монтаж шкафов управления.",
		en: "Laying cable routes, installing cables, instrumentation and control (I&C) installation, and control cabinet assembly.",
		de: "Kabeļu montāža, kabeļu trašu ierīkošana, vadības skapju izveide un uzstadīšana.",
	},
	"home_page-15": {
		ru: "Проектирование, обеспечение:",
		en: "Designing, providing:",
		de: "Projektēšana, nodrošināšana:",
	},
	"home_page-16": {
		ru: "Проектирование металлоконструкций, трубопроводов и узлов управления.",
		en: "Design of metal structures, pipelines, and control units.",
		de: "Metāla konstrukciju, cauruļvadu un vadības bloku projektēšana.",
	},
	"home_page-17": {
		ru: "Поставка комплектующих из нержавеющей стали AISI 304, AISI 316L и оборудования для пищевых производств.",
		en: "Supply of components made of stainless steel AISI 304, AISI 316L, and equipment for food production.",
		de: "AISI 304, AISI 316L nerusējošā tērauda komponentu, pārtikas produktu ražošanas aprīkojuma piegāde.",
	},
	"home_page-18": {
		ru: "Преимущества нашей компании:",
		en: "The advantages of our company:",
		de: "Mūsu uzņēmuma priekšrocības:",
	},
	"home_page-19": {
		ru: "Умения и Опыт - у нас работают только квалифицированные работники, с высоким уровнем профессионализма, глубокими знаниями и опытом.",
		en: "Skills and Experience - we employ only qualified professionals with a high level of expertise, deep knowledge, and experience.",
		de: "Prasmes un pieredze – pie mums strādā tikai kvalificēti darbinieki ar augstu profesionalitātes līmeni, dziļām zināšanām un pieredzi.",
	},
	"home_page-20": {
		ru: "Качество - мы гарантируем, что каждая задача выполняется с высоким качеством, уделяя внимание каждой маленькой детали и соблюдая все стандарты.",
		en: "Quality - we guarantee that every task is completed with high quality, paying attention to every little detail and adhering to all standards.",
		de: "Kvalitāte – mēs garantējam, ka katrs uzdevums tiek izpildīts ar augstu kvalitāti, pievēršot uzmanību katrai mazākajai detaļai un ievērojot visus standartus.",
	},
	"home_page-21": {
		ru: "Сроки - мы строго соблюдаем установленные сроки, обеспечивая своевременное выполнение всех задач без ущерба для качества и эффективности.",
		en: "Adherence to deadlines - we strictly adhere to deadlines, ensuring the timely completion of all tasks without compromising quality or efficiency.",
		de: "Termiņi – mēs stingri ievērojam noteiktos termiņus, nodrošinot savlaicīgu visu uzdevumu izpildi, nezaudējot kvalitāti un efektivitāti.",
	},
	"home_page-22": {
		ru: "О нас:",
		en: "About us",
		de: "Par mums:",
	},
	"home_page-23": {
		ru: "Наша реализация сварочных и монтажных решений оправдает или превзойдет ваши ожидания.",
		en: "Our implementation of welding and installation solutions will meet or exceed your expectations.",
		de: "Mūsu metināšanas un montāžas risinājumu īstenošana atbildīs jūsu cerībām vai pat pārsniegs tās.",
	},
	"home_page-24": {
		ru: "Контакты",
		en: "Contacts",
		de: "Kontakti",
	},
	"home_page-25": {
		ru: "Телефон: +371 22 846 549",
		en: "Phone: +371 22 846 549",
		de: "Telefons: +371 22 846 549",
	},
	"home_page-26": {
		ru: "Эмайл: info@weldmonts.lv",
		en: "Email: info@weldmonts.lv",
		de: "E-pasts: info@weldmonts.lv",
	},
	"home_page-27": {
		ru: "Адрес: J.Pliekšāna 96-31, Jūrmala.",
		en: "Address: J.Pliekšāna 96-31, Jūrmala.",
		de: "Adrese: J.Pliekšāna 96-31, Jūrmala.",
	},
	"home_page-28": {
		ru: "Меню",
		en: "Menu",
		de: "Menu",
	},
	"home_page-29": {
		ru: "> Дом",
		en: "> Home",
		de: "> Sākums",
	},
	"home_page-30": {
		ru: "> Контакты",
		en: "> Contacts",
		de: "> Kontakti",
	},
	"home_page-31": {
		ru: "> Галерея",
		en: "> Gallery",
		de: "> Galerija",
	},
	"home_page-32": {
		ru: "Спроси нас о чем-нибудь, или просто поздоровайтесь!",
		en: "Ask us anything, or just say hello!",
		de: "Pajautājiet mums kaut ko vai vienkārši sasveicinieties!",
	},
	"home_page-33": {
		ru: "ОТПРАВИТЬ",
		en: "SEND",
		de: "SŪTĪT",
	},
};

function checkPagePathName() {
	switch (currentPathName) {
		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName();

function changeLang() {
	for (const key in currentTexts) {
		let elem = document.querySelector(`[data-lang=${key}]`);
		if (elem) {
			elem.textContent = currentTexts[key][currentLang];
		}
	}
}
changeLang();

// Вешаем обработчики на каждую кнопку
langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn_active")) {
			currentLang = event.target.dataset.btn;
			localStorage.setItem("language", event.target.dataset.btn);
			resetActiveClass(langButtons, "header__btn_active");
			btn.classList.add("header__btn_active");
			changeLang();
		}
	});
});

// Сброс активного класса у переданного массива элементов
function resetActiveClass(arr, activeClass) {
	arr.forEach((elem) => {
		elem.classList.remove(activeClass);
	});
}

// Проверка активной кнопки
function checkActiveLangButton() {
	switch (currentLang) {
		case "ru":
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			break;
		case "en":
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;
		case "de":
			document
				.querySelector('[data-btn="de"]')
				.classList.add("header__btn_active");
			break;

		default:
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			break;
	}
}
checkActiveLangButton();

// Проверка языка браузера
function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((elem) => {
		return elem === navLang;
	});
	if (result) {
		return navLang;
	}
}

console.log("navigator.language", checkBrowserLang());
