let initialState = {
	LinkGroups:[
        {
            Links: [
                {Link: "/Statistics/Checks", Name: "Чеки"}
            ],
            Title: "Статистика",
            Key: "Statistics",
            Icon: "Statistics.svg"
        },
        {
            Links: [
                {Link: "/Menu/Products", Name: "Товары"},
                {Link: "/Menu/Options", Name: "Варианты товара"},
                {Link: "/Menu/Additives", Name: "Добавки"},
                {Link: "/Menu/Categories", Name: "Категории товаров"},
                {Link: "/Menu/Stocks", Name: "Акции"}
            ],
            Title: "Меню",
            Key: "Menu",
            Icon: "Menu.svg"
        },
        {
            Links: [
                {Link: "/Other/Comments", Name: "Отзывы"},
                {Link: "/Other/Contacts", Name: "Контакты"},
                {Link: "/Other/Cooperation", Name: "Кооперация"},
                {Link: "/Other/Levels", Name: "Уровни"}
            ],
            Title: "Всякое",
            Key: "Other",
            Icon: "Menu.svg"
        },
        {
            Links: [
                {Link: "/Access/Workers", Name: "Сотрудники"}
            ],
            Title: "Доступ",
            Key: "Access",
            Icon: "Structure.svg"
        },
        {
            Links: [
                {Link: "/Settings/Branches", Name: "Отделы"}
            ],
            Title: "Настройки",
            Key: "Settings",
            Icon: "Settings.svg"
        }
    ]
};

const NavBarReducer = (state = initialState ,action) => {
	let stateCopy = {...state};
	
	switch (action.type) {
		default:
			return stateCopy;
	}
}

export default NavBarReducer;
