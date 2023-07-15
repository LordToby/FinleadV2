const sectorsToEmoji = (sector) => {
  if (sector.includes(",")) {
    sector = sector.split(",")[0];
  }
  const group = getIndustryGroup(sector.toLowerCase());
  switch (group) {
    case "technology":
      return "💻";
    case "healthcare":
      return "🏥";
    case "finance":
      return "💰";
    case "energy":
      return "⚡️";
    case "retail and consumer goods":
      return "🛍️";
    case "industrial":
      return "🏭";
    case "real estate":
      return "🏠";
    case "transportation":
      return "🚛";
    case "oil and gas":
      return "🛢️";
    case "metals":
      return "⛏️";
    case "food and beverage":
      return "🍽️";
    case "airlines":
      return "🛩️";
    case "marine shipping":
      return "🚢";
    case "railroads":
      return "🚂";
    case "nuclear":
      return "☢️";
    case "solar":
      return "☀️";
    case "entertainment":
      return "🎬";
    case "shell companies":
      return "🐚";
    case "auto":
      return "🚗";
    case "recycling":
      return "♻️";
    case "gambling":
    case "resorts & casinos":
      return "🎰";
    case "tobacco":
      return "🚬";
    case "farming":
      return "🚜";
    case "biotechnology":
      return "🧬";
    case "drug manufacturing":
      return "💊";
    case "telecom":
      return "📞";
    case "packaged foods":
      return "📦🍴";
    case "restaurants":
      return "🍽️";
    case "beverages":
      return "🥤";
    case "education":
      return "📚";
    case "chemicals":
      return "🧪";
    case "news":
      return "📰";
    case "security":
      return "🔒";
    case "advertising":
      return "📺";
    case "conglomerate":
      return "🏢";
    default:
      return "❓";
  }
};

function getIndustryGroup(sector) {
  switch (sector) {
    case "semiconductors":
    case "consumer electronics":
    case "software - application":
    case "software - infrastructure":
    case "information technology services":
    case "communication equipment":
    case "computer hardware":
    case "electronic components":
    case "electronic gaming & multimedia":
    case "semiconductor equipment & materials":
    case "internet content & information":
      return "technology"; //technology
    case "diagnostics & tesearch":

    case "medical distribution":
    case "medical devices":

    case "health information services":
    case "medical care facilities":
    case "medical instruments & supplies":
    case "healthcare plans":
    case "pharmaceutical retailers":
    case "diagnostics & research":
      return "healthcare"; //healthcare
    case "drug manufacturers - general":
    case "drug manufacturers - specialty & generic":
      return "drug manufacturing";
    case "publishing":
      return "news";
    case "asset management":
    case "banks - regional":
    case "capital markets":
    case "credit services":
    case "insurance - diversified":
    case "insurance - life":
    case "insurance - specialty":
    case "insurance brokers":
    case "investment brokerage - national":
    case "mortgage finance":
    case "financial conglomerates":
    case "financial data & stock exchanges":
    case "insurance - property & casualty":
    case "insurance - reinsurance":
    case "banks - diversified":
      return "finance";
    case "security & protection services":
      return "security";
    case "oil & gas equipment & services":
    case "oil & gas refining & marketing":
    case "utilities - regulated electric":
    case "utilities - diversified":
    case "integrated freight & logistics":
    case "utilities - regulated water":
    case "utilities - regulated gas":
    case "exploration & production":
    case "oil & gas drilling":
    case "oil & gas integrated":
    case "oil & gas midstream":
    case "oil & gas e&p":
    case "oil & gas storage & transportation":
      return "oil and gas";
    case "specialty retail":
    case "specialty business services":
    case "apparel retail":
    case "apparel manufacturing":
    case "furnishings":
    case "fixtures & appliances":
    case "footwear & accessories":
    case "home improvement retail":
    case "packaging & containers":
    case "discount stores":
    case "luxury goods":
    case "personal services":
    case "department stores":
    case "internet retail":
      return "retail and consumer goods";

    case "building products & equipment":
    case "electrical equipment & parts":
    case "steel":
    case "pollution & treatment controls":
    case "industrial distribution":
    case "specialty industrial machinery":
    case "metal fabrication":
    case "building materials":
    case "tools & accessories":
    case "lumber & wood production":
      return "industrial";
    case "aluminum":
    case "copper":
    case "other industrial metals & mining":
    case "other precious metals & mining":
    case "gold":
      return "metals";
    case "reit - mortgage":
    case "rental & leasing services":
    case "reit - diversified":
    case "reit - retail":
    case "real estate - development":
    case "reit - specialty":
    case "real estate services":
    case "reit - residential":
    case "reit - office":
    case "lodging":
    case "real estate - diversified":
    case "reit - healthcare facilities":
    case "residential construction":
      return "real estate";
    case "travel services":
    case "recreational vehicles":
    case "integrated freight & logistics":
      return "transportation";
    case "airlines":
    case "aerospace & defense":
    case "airports & air services":
      return "airlines";
    case "uranium":
      return "nuclear";
    case "solar":
      return "solar";
    case "entertainment":
      return "entertainment";
    case "auto parts":
    case "auto & truck dealerships":
    case "auto manufacturers":
      return "auto";
    case "farm products":
    case "agricultural inputs":
      return "farming";
    case "waste management":
    case "utilities - renewable":
      return "recycling";
    case "beverages - non-alcoholic":
      return "beverages";
    case "telecom services":
      return "telecom";
    case "education & training services":
      return "education";

    case "specialty chemicals":
      return "chemicals";
    default:
      return sector;
  }
}

export default sectorsToEmoji;
