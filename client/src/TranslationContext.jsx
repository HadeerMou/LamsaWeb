import React, { createContext, useState, useContext } from "react";

// Translation data
const translations = {
  en: {
    english: "English",
    arabic: "Arabic",
    egp: "Egp",
    dollar: "Dollar",
    lamsa: "LAMSA",
    //header
    search: "What are you looking for?",
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact Us",

    //home
    brief:
      "Your ultimate destination for exquisite paintings, featuring timeless classics and modern masterpieces for every art enthusiast",
    ourapproach: "Our Approach",
    fastship: "Fast Shipping",
    fastcont: "We take care of shipping your products safe and fast",
    highqua: "High Quality",
    highcont: "our products is of high quality",
    support: "Support 24/7",
    supportcont: "our support is available for 24/7 to help you",
    featured: "Featured",
    ourpassion: "Our Passion is Your",
    inspairation: "Inspiration",
    passioncont:
      "With each livary wall we send you our passion for beautiful things for your home. The content of each wall is agreed with the Creators",
    shopnow: "Shop Now",
    showmore: "Show more",
    //footer
    foot: "Your ultimate destination for exquisite paintings, featuring timeless classics and modern masterpieces for every art enthusiast.",
    paintings: "Paintings",
    curtains: "Curtains",
    contInfo: "Contact Info",
    qlinks: "Quick Links",
    follow: "Follow Us",
    //auth
    loginTitle: "Welcome back to LAMSA",
    registerTitle: "Welcome to LAMSA",
    login: "Login",
    register: "Register",
    noacc: "Don't have an acoount",
    haveacc: "Already have an account",
    forgotpass: "Forgot password?",
    emailverify: "Email Verification",
    sendcode: "Send Code",
    enteremail: "Enter your email address to receive a verification code",
    entercode: "Enter the Code sent to your email",
    resetpass: "Reset Password",
    enternewpass: "Please enter a new password to update your password",
    newpass: "New Password",
    confirmpass: "Confirm Password",
    verifycode: "Verify Code",
    enter6digit: "Please enter the 6-digit code we sent to ",
    sendagain: "Send Again",
    continue: "Continue",
    update: "Update",
    cancel: "Cancel",

    //about
    abtit: "About Us",
    intro:
      "At Lamsa, we don’t just sell curtains and paintings—we help you create a home that tells your story. Let us bring a touch of elegance to your space. 🏡✨",
    aboutlamsa: "About Lamsa",
    aboutcontent:
      "At Lamsa, we transform spaces into elegant masterpieces. we bring you carefully curated designs of paintings and curtains that add sophistication, warmth, and personality to your home. Whether you’re searching for luxurious drapes to enhance your windows or stunning artwork to elevate your walls, Lamsa offers premium-quality selections that cater to various styles and tastes. With a commitment to quality, creativity, and customer satisfaction, Lamsa ensures that every piece you choose reflects your unique aesthetic while maintaining superior craftsmanship.",
    vision: "Our vision",
    visioncont:
      "To become the leading online destination for high-quality home décor,inspiring customers to create stylish and harmonious living spaces.",
    mission: "Our Mission",
    aim: "At Lamsa, we aim to:",
    mission1:
      "Offer a diverse range of curtains and paintings that combine elegance, durability, and affordability.",
    mission2:
      "Provide a seamless online shopping experience with easy navigation, secure transactions, and fast delivery.",
    mission3:
      "Empower customers with expert design guidance to help them choose the perfect pieces for their homes.",
    mission4:
      "Continuously innovate and expand our product collections to meet evolving design trends and customer preferences.",
    values: "Our Values",
    value1:
      "✨ Quality First – We prioritize premium materials and craftsmanship in every product we offer.",
    value2:
      "🎨 Creativity & Elegance – Our collection is carefully designed to inspire and enhance your space with artistic beauty.",
    value3:
      "🤝 Customer-Centric Approach – Your satisfaction is our top priority, and we are committed to delivering outstanding service.",
    value4:
      "🌿 Sustainability – We strive to source and produce environmentally responsible products that contribute to a better future.",
    value5:
      "💡 Innovation – We stay ahead of design trends to bring you fresh, stylish, and modern décor solutions.",
    //contact
    face: "facebook",
    insta: "instagram",
    youtube: "Youtube",
    sendbtn: "Send",
    //productView
    addtocart: "Add to cart",
    relatedname: "Related Products",
    recommendedname: "Recommended for you",
    //profile
    welcome: "Hey, Welcome Back",
    personalinfo: "Personal information",
    billing: "Billing & Payments",
    username: "Username",
    number: "Phone Number",
    password: "Password",
    changpass: "Change Password",
    address: "Address",
    //dashboard sidebar
    dashboardname: "Dashboard",
    customersname: "Customers",
    productsname: "Products",
    ordersname: "Orders",
    analyticsname: "Analytics",
    messagesname: "Messages",
    adminname: "Admins",
    //dashboard
    dashtitle: "Dashboard",
    totalsales: "Total Sales",
    time: "Last 24 hours",
    totalexpanses: "Total Expenses",
    totalincome: "Total Income",
    recentorders: "Recent Orders",
    prodname: "Product Name",
    prodnum: "Product Number",
    pay: "Payment",
    status: "Status",
    pending: "Pending",
    showall: "Show All",
    recentupdates: "Recent Updates",
    salesanalytics: "Sales Analytics",
    onlineorders: "ONLINE ORDERS",
    offlineorders: "OFFLINE ORDERS",
    newcustomer: " NEW CUSTOMERS",
    addprod: "Add Product",
    //dasboard customers
    cutomerstitle: "Customers",
    name: "Name",
    email: "Email",
    orderno: "Order No",
    userid: "User ID",
    //dashboard orders
    neworders: "New Orders",
    onprogress: "On Progress",
    deliveredorders: "Delivered Orders",
    cancelledorders: "Cancelled Orders",
    new: "New",
    price: "Price",
    totalpayment: "Total Payments",
    orderdetail: "Order Details",
    //dashboard messages
    allmessages: "All Messages",
    //dashboard products
    select: "Select",
    pn: "Pn",
    categoryname: "Category",
    stock: "Stock",
    sold: "Sold",
    action: "Actions",
    previous: "Previous",
    next: "Next",
    //dashboard chat
    send: "Send",
    // dashboard admins
    adminid: "Admin ID",
    createdAt: "Created At",
    deletedAt: "Deleted At",
    adminRole: "Admin Role",
    delete: "Delete",
    createAdmin: "Create new Admin",
    totalPrice: "Total price",
    totalItems: "Total items",
    remove: "Remove",
    checkout: "Checkout",
    logout: "Log out",
    alladdresses: "All Addresses",
    addaddress: "Add New Address",
    backtoprof: "Back to profile",
    countries: "Countries",
    cities: "Cities",
    categories: "Categories",
    shippingfees: "Shipping Fees",
    createUser: "Create User",
    createCountry: "Create Country",
    createCity: "Create City",
    createCategory: "Create Category",
    createProduct: "Create Product",
    imgupload: "Image Upload",
    editcategory: "Edit Category",
    edit: "Edit",
    description: "Description",
    quantity: "Quantity",
    categoryId: "Category Id",
    cityId: "City Id",
    productImage: "Product Image",
    actions: "Actions",
    admins: "Admins",
    close: "close",
    countryId: "Country Id",
    prodOndm: "Produced on demand",
    //address
    streetname: "Street Name",
    selectcity: "Select City",
    selectcountry: "Select Country",
    selectdistrict: "Select District",
    setdefault: "Set as default",
    addnewaddress: "Add New Address",
    editaddress: "Edit Address",
    //checkout
    fullname: "Full Name",
    buildingno: "Building No",
    apartmentno: "Apartment No",
    country: "Country",
    city: "City",
    district: "District",
    ordersummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    //success order
    orderplaces: "Order Placed Successfully!",
    thankyou: "Thank you for your purchase. Your order is being processed.",
    gohome: "Go to Homepage",
    choosecolor: "choose by color",
  },
  ar: {
    english: "إنجليزي",
    arabic: "عربي",
    egp: "جنيه",
    dollar: "دولار",
    lamsa: "لمسة",
    //header
    search: "ما الذى تبحث عنه؟",
    home: "الصفحة الرئيسية",
    products: "منتجاتنا",
    about: "معلومات عنا",
    contact: "تواصل معنا",
    loginTitle: "مرحبًا بك مجددًا في لمسة",
    registerTitle: "مرحبًا بك في لمسة",
    login: "تسجيل الدخول",
    register: "التسجيل",
    noacc: "ليس لديك حساب؟",
    haveacc: "لديك حساب بالفعل؟",
    forgotpass: "هل نسيت كلمة السر؟",

    //home
    brief:
      "وجهتك المثالية للوحات الفنية الرائعة، والتي تضم أعمالاً كلاسيكية خالدة وروائع فنية حديثة تناسب كل عشاق الفن",
    ourapproach: "نهجنا",
    fastship: "الشحن السريع",
    fastcont: "نحن نحرص على شحن منتجاتك بشكل آمن وسريع",
    highqua: "جودة عالية",
    highcont: "منتجاتنا ذات جودة عالية",
    support: "دعم 24/7",
    supportcont: "دعمنا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك",
    featured: "المميز",
    ourpassion: "شغفنا هو ",
    inspairation: "إلهامك",
    passioncont:
      "مع كل جدار في المكتبة، نُرسل إليكم شغفنا بالأشياء الجميلة لمنزلكم. محتوى كل جدار مُتفق عليه مع المبدعين",
    shopnow: "تسوق الآن",
    more: "عرض المزيد",
    //footer
    foot: "وجهتك المثالية للوحات الفنية الرائعة، والتي تضم أعمالاً كلاسيكية خالدة وروائع فنية حديثة تناسب كل عشاق الفن",
    paintings: "لوحات فنية",
    curtains: "ستائر",
    contInfo: "معلومات الاتصال",
    qlinks: "روابط سريعة",
    follow: "تابعنا",
    //about
    abtit: "معلومات عنا",
    intro:
      "🏡✨ في لمسة، لا نبيع الستائر واللوحات فحسب، بل نساعدك على إنشاء منزل يروي قصتك. دعنا نضفي لمسة من الأناقة على مساحتك ",
    aboutlamsa: "نبذة عن لمسة",
    aboutcontent:
      "في لمسة، نحول المساحات إلى روائع فنية أنيقة. نقدم لكم تصاميم مختارة بعناية من اللوحات والستائر التي تضفي على منزلكم لمسة من الرقي والدفء والشخصية المميزة. سواء كنتم تبحثون عن ستائر فاخرة لإضفاء لمسة جمالية على نوافذكم أو أعمال فنية خلابة لإضفاء لمسة جمالية على جدرانكم، تقدم لمسة تشكيلات عالية الجودة تناسب مختلف الأذواق والأنماط. مع التزامنا بالجودة والإبداع ورضا العملاء، تضمن لمسة أن تعكس كل قطعة تختارونها جمالكم الفريد مع الحفاظ على الحرفية العالية",
    vision: "رؤيتنا",
    visioncont:
      "أن نصبح الوجهة الإلكترونية الرائدة للديكور المنزلي عالي الجودة، ونلهم العملاء لابتكار مساحات معيشة أنيقة ومتناغمة",
    mission: "مهمتنا",
    aim: ":في لمسة، نهدف إلى",
    mission1:
      "تقديم مجموعة متنوعة من الستائر واللوحات تجمع بين الأناقة والمتانة وبأسعار معقولة",
    mission2:
      "توفير تجربة تسوق إلكتروني سلسة مع سهولة التصفح، ومعاملات آمنة، وتوصيل سريع",
    mission3:
      "تمكين العملاء من خلال إرشادات تصميمية احترافية لمساعدتهم على اختيار القطع المثالية لمنازلهم",
    mission4:
      "الابتكار المستمر وتوسيع مجموعات منتجاتنا لتلبية أحدث اتجاهات التصميم وتفضيلات العملاء",
    values: "قيمنا",
    value1:
      "✨ الجودة أولاً - نعطي الأولوية للمواد الفاخرة والحرفية في كل منتج نقدمه",
    value2:
      "🎨 الجودة أولاً - نعطي الأولوية للمواد الفاخرة والحرفية في كل منتج نقدمه",
    value3:
      "🤝 نهج يركز على العميل - رضاكم هو أولويتنا القصوى، ونحن ملتزمون بتقديم خدمة متميزة",
    value4:
      "🌿 الاستدامة - نسعى جاهدين لتوفير و إنتاج منتجات صديقة للبيئة تُسهم في مستقبل أفضل",
    value5:
      "💡 الابتكار - نواكب أحدث صيحات التصميم لنقدم لكم حلول ديكور عصرية وأنيقة",
    face: "فيسبوك",
    insta: "انستجرام",
    youtube: "يوتيوب",
    question:
      "هل لديك سؤال أو تحتاج إلى أي مساعدة؟ اتصل بنا وسنكون سعداء بمساعدتك.",
    contactemail: "اتصل بنا عبر البريد الإلكتروني",
    commentbtn: "تعليق",
    formtitle: "شاركنا برأيك حول تجربتك مع شارمي أو أي تعليق تريده.",
    sendbtn: "أرسل",
    //auth
    emailverify: "التحقق من البريد الإلكتروني",
    sendcode: "إرسال الرمز",
    enteremail: "أدخل عنوان بريدك الإلكتروني لتلقي رمز التحقق",
    entercode: "أدخل الرمز المُرسَل إلى بريدك الإلكتروني",
    resetpass: "إعادة تعيين كلمة المرور",
    enternewpass: "يرجى إدخال كلمة مرور جديدة لتحديث كلمة مرورك",
    newpass: "كلمة مرور جديدة",
    confirmpass: "تأكيد كلمة المرور",
    verifycode: "التحقق من الرمز",
    enter6digit: " يرجى إدخال الرمز المكون من 6 أرقام الذي أرسلناه إلى",
    sendagain: "إرسال مرة أخرى",
    continue: "متابعة",
    //productView
    addtocart: "أضف إلى السلة",
    relatedname: "المنتجات ذات الصلة",
    recommendedname: "موصى به لك",
    //profile
    welcome: "مرحباً بك مرة أخرى",
    personalinfo: "المعلومات الشخصية",
    billing: "الفواتير والدفعات",
    ordersname: "الطلبات",
    username: "اسم المستخدم",
    number: "رقم التليفون",
    password: "كلمة المرور",
    changpass: "تغيير كلمة المرور",
    address: "عنوان",
    //dashboard sidebar
    dashboardname: "لوحة القيادة",
    customersname: "عملاء",
    productsname: "المنتجات",
    analyticsname: "التحليلات",
    messagesname: "رسائل",
    adminname: "المشرفين",
    //dashboard
    dashtitle: "لوحة القيادة",
    totalsales: "إجمالي المبيعات",
    time: "آخر 24 ساعة",
    totalexpanses: "إجمالي النفقات",
    totalincome: "إجمالي الدخل",
    recentorders: "الطلبات الأخيرة",
    prodname: "اسم المنتج",
    prodnum: "رقم المنتج",
    pay: "الدفع",
    status: "حالة",
    pending: "قيد الانتظار",
    showall: "إظهار الكل",
    recentupdates: "التحديثات الأخيرة",
    salesanalytics: "تحليلات المبيعات",
    onlineorders: "الطلبات عبر الإنترنت",
    offlineorders: "الطلبات غير المتصلة بالإنترنت",
    newcustomer: "العملاء الجدد",
    addprod: "إضافة المنتج",
    //dasboard customers
    cutomerstitle: "العملاء",
    name: "الاسم",
    email: "ايميل",
    orderno: "رقم الطلب",
    userid: "رقم المستخدم",
    //dashboard orders
    neworders: "الطلبات الجديدة",
    onprogress: "في التقدم",
    deliveredorders: "الطلبات المُسلَّمة",
    cancelledorders: "الطلبات الملغاة",
    new: "جديد",
    showmore: "عرض المزيد",
    totalpayment: "مجموع المدفوعات",
    orderdetail: "تفاصيل الطلب",
    //dashboard messages
    allmessages: "كل الرسائل",
    //dashboard products
    select: "اختار",
    categoryname: "الفئة",
    stock: "مخزون",
    sold: "مُباع",
    price: "السعر",
    action: "الإجراءات",
    previous: "السابق",
    next: "التالي",
    //dashboard chat
    send: "أرسل",
    //dashboard admins
    adminid: "رقم المشرف",
    createdAt: "تم الإنشاء في",
    deletedAt: "تم الحذف في",
    adminRole: "دور المشرف",
    delete: "حذف",
    createAdmin: "إنشاء مشرف جديد",
    totalPrice: "السعر الاجمالي",
    totalItems: "مجموع العناصر",
    remove: "إزالة",
    checkout: "الدفع",
    logout: "تسجيل الخروج",
    alladdresses: "جميع العناوين",
    addaddress: "إضافة عنوان جديد",
    backtoprof: "العودة إلى الملف الشخصي",
    countries: "الدول",
    cities: "المدن",
    categories: "الفئات",
    shippingfees: "رسوم الشحن",
    createUser: "إنشاء مستخدم",
    createCountry: "إنشاء دولة",
    createCity: "إنشاء مدينة",
    createCategory: "إنشاء فئة",
    createProduct: "إنشاء منتج",
    imgupload: "تحميل الصورة",
    edit: "تحرير",
    description: "الوصف",
    quantity: "الكمية",
    categoryId: "معرف الفئة",
    cityId: "معرف المدينة",
    countryId: "معرف البلد",
    productImage: "صورة المنتج",
    actions: "الإجراءات",
    admins: "المشرفين",
    close: "غلق",
    prodOndm: "ينتج عند الطلب",
    //address
    streetname: "اسم الشارع",
    selectcity: "اختر المدينة",
    selectcountry: "اختر الدولة",
    selectdistrict: "اختر الحي",
    setdefault: "تعيين كافتراضي",
    addnewaddress: "إضافة عنوان جديد",
    editaddress: "تعديل العنوان",
    //checkout
    fullname: "الاسم الكامل",
    buildingno: "رقم المبنى",
    apartmentno: "رقم الشقة",
    country: "الدولة",
    city: "المدينة",
    district: "الحي",
    ordersummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    total: "الإجمالي",
    //success order
    orderplaces: "تم تقديم الطلب بنجاح",
    thankyou: "شكرًا لك على شرائك. يتم معالجة طلبك.",
    gohome: "الذهاب إلى الصفحة الرئيسية",
    choosecolor: "اختر باللون",
  },
};

// Create TranslationContext
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const savedLanguage = localStorage.getItem("language") || "en";
  const [language, setLanguage] = useState(savedLanguage); // Default language is English
  const direction = language === "ar" ? "rtl" : "ltr";

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // Save to localStorage
  };

  return (
    <TranslationContext.Provider
      value={{
        translations: translations[language],
        language,
        changeLanguage,
        direction,
      }}
    >
      <div dir={direction}>{children}</div>
    </TranslationContext.Provider>
  );
};

// Custom hook to access the translations and change language
export const useTranslation = () => useContext(TranslationContext);
