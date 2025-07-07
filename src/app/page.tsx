'use client'

import { Form } from "../../lib/components/Form";
import { Radio } from "../../lib/components/Radio";
import { Checkbox } from "../../lib/components/Checkbox";
import { Item } from "../../lib/components/Form/Item";
import { useForm } from "../../lib/hooks/useForm";
import { Input } from "../../lib/components/Input";
import { Select } from "../../lib/components/Select";
import { Suspense, useCallback, useState } from "react";
import { Button } from "../../lib/components/Button";
// import Option from "../../lib/components/Select/Option/Option";

// import { Form as AntForm, Select as AntSelect } from 'antd'
// import FormItem from "antd/es/form/FormItem";

export const CountryCodes = [...new Set([
    {
        "label": "Afghanistan",
        "value": "AF",
        "name": "Afghanistan",
        "currencyCountries": "AFN",
        "alpha3Code": "AFG"
    },
    {
        "label": "Aland Islands",
        "value": "AX",
        "name": "Aland Islands",
        "currencyCountries": "",
        "alpha3Code": "ALA"
    },
    {
        "label": "Albania",
        "value": "AL",
        "name": "Albania",
        "currencyCountries": "ALL",
        "alpha3Code": "ALB"
    },
    {
        "label": "Algeria",
        "value": "DZ",
        "name": "Algeria",
        "currencyCountries": "DZD",
        "alpha3Code": "DZA"
    },
    {
        "label": "American Samoa",
        "value": "AS",
        "name": "American Samoa",
        "currencyCountries": "USD",
        "alpha3Code": "ASM"
    },
    {
        "label": "Andorra",
        "value": "AD",
        "name": "Andorra",
        "currencyCountries": "EUR",
        "alpha3Code": "AND"
    },
    {
        "label": "Angola",
        "value": "AO",
        "name": "Angola",
        "currencyCountries": "AOA",
        "alpha3Code": "AGO"
    },
    {
        "label": "Anguilla",
        "value": "AI",
        "name": "Anguilla",
        "currencyCountries": "XCD",
        "alpha3Code": "AIA"
    },
    {
        "label": "Antigua and Barbuda",
        "value": "AG",
        "name": "Antigua and Barbuda",
        "currencyCountries": "XCD",
        "alpha3Code": "ATG"
    },
    {
        "label": "Argentina",
        "value": "AR",
        "name": "Argentina",
        "currencyCountries": "ARS",
        "alpha3Code": "ARG"
    },
    {
        "label": "Armenia",
        "value": "AM",
        "name": "Armenia",
        "currencyCountries": "AMD",
        "alpha3Code": "ARM"
    },
    {
        "label": "Aruba",
        "value": "AW",
        "name": "Aruba",
        "currencyCountries": "AWG",
        "alpha3Code": "ABW"
    },
    {
        "label": "Australia",
        "value": "AU",
        "name": "Australia",
        "currencyCountries": "AUD",
        "alpha3Code": "AUS"
    },
    {
        "label": "Austria",
        "value": "AT",
        "name": "Austria",
        "currencyCountries": "EUR",
        "alpha3Code": "AUT"
    },
    {
        "label": "Azerbaijan",
        "value": "AZ",
        "name": "Azerbaijan",
        "currencyCountries": "AZN",
        "alpha3Code": "AZE"
    },
    {
        "label": "Bahamas",
        "value": "BS",
        "name": "Bahamas",
        "currencyCountries": "BSD",
        "alpha3Code": "BHS"
    },
    {
        "label": "Bahrain",
        "value": "BH",
        "name": "Bahrain",
        "currencyCountries": "BHD",
        "alpha3Code": "BHR"
    },
    {
        "label": "Bangladesh",
        "value": "BD",
        "name": "Bangladesh",
        "currencyCountries": "BDT",
        "alpha3Code": "BGD"
    },
    {
        "label": "Barbados",
        "value": "BB",
        "name": "Barbados",
        "currencyCountries": "BBD",
        "alpha3Code": "BRB"
    },
    {
        "label": "Belarus",
        "value": "BY",
        "name": "Belarus",
        "currencyCountries": "BYR",
        "alpha3Code": "BLR"
    },
    {
        "label": "Belgium",
        "value": "BE",
        "name": "Belgium",
        "currencyCountries": "EUR",
        "alpha3Code": "BEL"
    },
    {
        "label": "Belize",
        "value": "BZ",
        "name": "Belize",
        "currencyCountries": "BZD",
        "alpha3Code": "BLZ"
    },
    {
        "label": "Benin",
        "value": "BJ",
        "name": "Benin",
        "currencyCountries": "XOF",
        "alpha3Code": "BEN"
    },
    {
        "label": "Bermuda",
        "value": "BM",
        "name": "Bermuda",
        "currencyCountries": "BMD",
        "alpha3Code": "BMU"
    },
    {
        "label": "Bhutan",
        "value": "BT",
        "name": "Bhutan",
        "currencyCountries": "BTN",
        "alpha3Code": "BTN"
    },
    {
        "label": "Bolivia",
        "value": "BO",
        "name": "Bolivia",
        "currencyCountries": "BOB",
        "alpha3Code": "BOL"
    },
    {
        "label": "Bonaire",
        "value": "BQ",
        "name": "Bonaire",
        "currencyCountries": "",
        "alpha3Code": "BES"
    },
    {
        "label": "Bosnia and Herzegovina",
        "value": "BA",
        "name": "Bosnia and Herzegovina",
        "currencyCountries": "BAM",
        "alpha3Code": "BIH"
    },
    {
        "label": "Botswana",
        "value": "BW",
        "name": "Botswana",
        "currencyCountries": "BWP",
        "alpha3Code": "BWA"
    },
    {
        "label": "Bouvet Island",
        "value": "BV",
        "name": "Bouvet Island",
        "currencyCountries": "NOK",
        "alpha3Code": "BVT"
    },
    {
        "label": "Brazil",
        "value": "BR",
        "name": "Brazil",
        "currencyCountries": "BRL",
        "alpha3Code": "BRA"
    },
    {
        "label": "British Indian Ocean Territory",
        "value": "IO",
        "name": "British Indian Ocean Territory",
        "currencyCountries": "USD",
        "alpha3Code": "IOT"
    },
    {
        "label": "Brunei Darussalam",
        "value": "BN",
        "name": "Brunei Darussalam",
        "currencyCountries": "BND",
        "alpha3Code": "BRN"
    },
    {
        "label": "Bulgaria",
        "value": "BG",
        "name": "Bulgaria",
        "currencyCountries": "BGN",
        "alpha3Code": "BGR"
    },
    {
        "label": "Burkina Faso",
        "value": "BF",
        "name": "Burkina Faso",
        "currencyCountries": "XOF",
        "alpha3Code": "BFA"
    },
    {
        "label": "Burundi",
        "value": "BI",
        "name": "Burundi",
        "currencyCountries": "BIF",
        "alpha3Code": "BDI"
    },
    {
        "label": "Cambodia",
        "value": "KH",
        "name": "Cambodia",
        "currencyCountries": "KHR",
        "alpha3Code": "KHM"
    },
    {
        "label": "Cameroon",
        "value": "CM",
        "name": "Cameroon",
        "currencyCountries": "XAF",
        "alpha3Code": "CMR"
    },
    {
        "label": "Canada",
        "value": "CA",
        "name": "Canada",
        "currencyCountries": "CAD",
        "alpha3Code": "CAN"
    },
    {
        "label": "Cabo Verde",
        "value": "CV",
        "name": "Cabo Verde",
        "currencyCountries": "CVE",
        "alpha3Code": "CPV"
    },
    {
        "label": "Cayman Islands",
        "value": "KY",
        "name": "Cayman Islands",
        "currencyCountries": "KYD",
        "alpha3Code": "CYM"
    },
    {
        "label": "Central African Republic",
        "value": "CF",
        "name": "Central African Republic",
        "currencyCountries": "XAF",
        "alpha3Code": "CAF"
    },
    {
        "label": "Chad",
        "value": "TD",
        "name": "Chad",
        "currencyCountries": "XAF",
        "alpha3Code": "TCD"
    },
    {
        "label": "Chile",
        "value": "CL",
        "name": "Chile",
        "currencyCountries": "CLP",
        "alpha3Code": "CHL"
    },
    {
        "label": "China",
        "value": "CN",
        "name": "China",
        "currencyCountries": "CNY",
        "alpha3Code": "CHN"
    },
    {
        "label": "Christmas Island",
        "value": "CX",
        "name": "Christmas Island",
        "currencyCountries": "AUD",
        "alpha3Code": "CXR"
    },
    {
        "label": "Cocos (Keeling) Islands",
        "value": "CC",
        "name": "Cocos (Keeling) Islands",
        "currencyCountries": "AUD",
        "alpha3Code": "CCK"
    },
    {
        "label": "Colombia",
        "value": "CO",
        "name": "Colombia",
        "currencyCountries": "COP",
        "alpha3Code": "COL"
    },
    {
        "label": "Comoros",
        "value": "KM",
        "name": "Comoros",
        "currencyCountries": "KMF",
        "alpha3Code": "COM"
    },
    {
        "label": "Congo",
        "value": "CG",
        "name": "Congo",
        "currencyCountries": "XAF",
        "alpha3Code": "COG"
    },
    {
        "label": "Congo, Democratic Republic of the (Zaire)",
        "value": "CD",
        "name": "Congo, Democratic Republic of the (Zaire)",
        "currencyCountries": "CDF",
        "alpha3Code": "COD"
    },
    {
        "label": "Cook Islands",
        "value": "CK",
        "name": "Cook Islands",
        "currencyCountries": "NZD",
        "alpha3Code": "COK"
    },
    {
        "label": "Costa Rica",
        "value": "CR",
        "name": "Costa Rica",
        "currencyCountries": "CRC",
        "alpha3Code": "CRI"
    },
    {
        "label": "Cote d'Ivoire",
        "value": "CI",
        "name": "Cote d'Ivoire",
        "currencyCountries": "XOF",
        "alpha3Code": "CIV"
    },
    {
        "label": "Croatia",
        "value": "HR",
        "name": "Croatia",
        "currencyCountries": "HRK",
        "alpha3Code": "HRV"
    },
    {
        "label": "Cuba",
        "value": "CU",
        "name": "Cuba",
        "currencyCountries": "CUP",
        "alpha3Code": "CUB"
    },
    {
        "label": "Curacao",
        "value": "CW",
        "name": "Curacao",
        "currencyCountries": "",
        "alpha3Code": "CUW"
    },
    {
        "label": "Cyprus",
        "value": "CY",
        "name": "Cyprus",
        "currencyCountries": "EUR",
        "alpha3Code": "CYP"
    },
    {
        "label": "Czech Republic",
        "value": "CZ",
        "name": "Czech Republic",
        "currencyCountries": "CZK",
        "alpha3Code": "CZE"
    },
    {
        "label": "Denmark",
        "value": "DK",
        "name": "Denmark",
        "currencyCountries": "DKK",
        "alpha3Code": "DNK"
    },
    {
        "label": "Djibouti",
        "value": "DJ",
        "name": "Djibouti",
        "currencyCountries": "DJF",
        "alpha3Code": "DJI"
    },
    {
        "label": "Dominica",
        "value": "DM",
        "name": "Dominica",
        "currencyCountries": "XCD",
        "alpha3Code": "DMA"
    },
    {
        "label": "Dominican Republic",
        "value": "DO",
        "name": "Dominican Republic",
        "currencyCountries": "DOP",
        "alpha3Code": "DOM"
    },
    {
        "label": "Ecuador",
        "value": "EC",
        "name": "Ecuador",
        "currencyCountries": "ECS",
        "alpha3Code": "ECU"
    },
    {
        "label": "Egypt",
        "value": "EG",
        "name": "Egypt",
        "currencyCountries": "EGP",
        "alpha3Code": "EGY"
    },
    {
        "label": "El Salvador",
        "value": "SV",
        "name": "El Salvador",
        "currencyCountries": "SVC",
        "alpha3Code": "SLV"
    },
    {
        "label": "Equatorial Guinea",
        "value": "GQ",
        "name": "Equatorial Guinea",
        "currencyCountries": "XAF",
        "alpha3Code": "GNQ"
    },
    {
        "label": "Eritrea",
        "value": "ER",
        "name": "Eritrea",
        "currencyCountries": "ERN",
        "alpha3Code": "ERI"
    },
    {
        "label": "Estonia",
        "value": "EE",
        "name": "Estonia",
        "currencyCountries": "EUR",
        "alpha3Code": "EST"
    },
    {
        "label": "Ethiopia",
        "value": "ET",
        "name": "Ethiopia",
        "currencyCountries": "ETB",
        "alpha3Code": "ETH"
    },
    {
        "label": "Falkland Islands",
        "value": "FK",
        "name": "Falkland Islands (Malvinas)",
        "currencyCountries": "FKP",
        "alpha3Code": "FLK"
    },
    {
        "label": "Faroe Islands",
        "value": "FO",
        "name": "Faroe Islands",
        "currencyCountries": "DKK",
        "alpha3Code": "FRO"
    },
    {
        "label": "Fiji",
        "value": "FJ",
        "name": "Fiji",
        "currencyCountries": "FJD",
        "alpha3Code": "FJI"
    },
    {
        "label": "Finland",
        "value": "FI",
        "name": "Finland",
        "currencyCountries": "EUR",
        "alpha3Code": "FIN"
    },
    {
        "label": "France",
        "value": "FR",
        "name": "France",
        "currencyCountries": "EUR",
        "alpha3Code": "FRA"
    },
    {
        "label": "French Guiana",
        "value": "GF",
        "name": "French Guiana",
        "currencyCountries": "EUR",
        "alpha3Code": "GUF"
    },
    {
        "label": "French Polynesia",
        "value": "PF",
        "name": "French Polynesia",
        "currencyCountries": "XPF",
        "alpha3Code": "PYF"
    },
    {
        "label": "French Southern Territories",
        "value": "TF",
        "name": "French Southern Territories",
        "currencyCountries": "EUR",
        "alpha3Code": "ATF"
    },
    {
        "label": "Gabon",
        "value": "GA",
        "name": "Gabon",
        "currencyCountries": "XAF",
        "alpha3Code": "GAB"
    },
    {
        "label": "Gambia",
        "value": "GM",
        "name": "Gambia",
        "currencyCountries": "GMD",
        "alpha3Code": "GMB"
    },
    {
        "label": "Georgia",
        "value": "GE",
        "name": "Georgia",
        "currencyCountries": "GEL",
        "alpha3Code": "GEO"
    },
    {
        "label": "Germany",
        "value": "DE",
        "name": "Germany",
        "currencyCountries": "EUR",
        "alpha3Code": "DEU"
    },
    {
        "label": "Ghana",
        "value": "GH",
        "name": "Ghana",
        "currencyCountries": "GHS",
        "alpha3Code": "GHA"
    },
    {
        "label": "Gibraltar",
        "value": "GI",
        "name": "Gibraltar",
        "currencyCountries": "GIP",
        "alpha3Code": "GIB"
    },
    {
        "label": "Greece",
        "value": "GR",
        "name": "Greece",
        "currencyCountries": "EUR",
        "alpha3Code": "GRC"
    },
    {
        "label": "Greenland",
        "value": "GL",
        "name": "Greenland",
        "currencyCountries": "DKK",
        "alpha3Code": "GRL"
    },
    {
        "label": "Grenada",
        "value": "GD",
        "name": "Grenada",
        "currencyCountries": "XCD",
        "alpha3Code": "GRD"
    },
    {
        "label": "Guadeloupe",
        "value": "GP",
        "name": "Guadeloupe",
        "currencyCountries": "EUR",
        "alpha3Code": "GLP"
    },
    {
        "label": "Guam",
        "value": "GU",
        "name": "Guam",
        "currencyCountries": "USD",
        "alpha3Code": "GUM"
    },
    {
        "label": "Guatemala",
        "value": "GT",
        "name": "Guatemala",
        "currencyCountries": "QTQ",
        "alpha3Code": "GTM"
    },
    {
        "label": "Guernsey",
        "value": "GG",
        "name": "Guernsey",
        "currencyCountries": "GGP",
        "alpha3Code": "GGY"
    },
    {
        "label": "Guinea",
        "value": "GN",
        "name": "Guinea",
        "currencyCountries": "GNF",
        "alpha3Code": "GIN"
    },
    {
        "label": "Guinea-Bissau",
        "value": "GW",
        "name": "Guinea-Bissau",
        "currencyCountries": "GWP",
        "alpha3Code": "GNB"
    },
    {
        "label": "Guyana",
        "value": "GY",
        "name": "Guyana",
        "currencyCountries": "GYD",
        "alpha3Code": "GUY"
    },
    {
        "label": "Haiti",
        "value": "HT",
        "name": "Haiti",
        "currencyCountries": "HTG",
        "alpha3Code": "HTI"
    },
    {
        "label": "Heard Island and Mcdonald Islands",
        "value": "HM",
        "name": "Heard Island and Mcdonald Islands",
        "currencyCountries": "AUD",
        "alpha3Code": "HMD"
    },
    {
        "label": "Holy See",
        "value": "VA",
        "name": "Holy See",
        "currencyCountries": "EUR",
        "alpha3Code": "VAT"
    },
    {
        "label": "Honduras",
        "value": "HN",
        "name": "Honduras",
        "currencyCountries": "HNL",
        "alpha3Code": "HND"
    },
    {
        "label": "Hong Kong",
        "value": "HK",
        "name": "Hong Kong",
        "currencyCountries": "HKD",
        "alpha3Code": "HKG"
    },
    {
        "label": "Hungary",
        "value": "HU",
        "name": "Hungary",
        "currencyCountries": "HUF",
        "alpha3Code": "HUN"
    },
    {
        "label": "Iceland",
        "value": "IS",
        "name": "Iceland",
        "currencyCountries": "ISK",
        "alpha3Code": "ISL"
    },
    {
        "label": "India",
        "value": "IN",
        "name": "India",
        "currencyCountries": "INR",
        "alpha3Code": "IND"
    },
    {
        "label": "Indonesia",
        "value": "ID",
        "name": "Indonesia",
        "currencyCountries": "IDR",
        "alpha3Code": "IDN"
    },
    {
        "label": "Iran",
        "value": "IR",
        "name": "Iran",
        "currencyCountries": "IRR",
        "alpha3Code": "IRN"
    },
    {
        "label": "Iraq",
        "value": "IQ",
        "name": "Iraq",
        "currencyCountries": "IQD",
        "alpha3Code": "IRQ"
    },
    {
        "label": "Ireland",
        "value": "IE",
        "name": "Ireland",
        "currencyCountries": "EUR",
        "alpha3Code": "IRL"
    },
    {
        "label": "Isle of Man",
        "value": "IM",
        "name": "Isle of Man",
        "currencyCountries": "GBP",
        "alpha3Code": "IMN"
    },
    {
        "label": "Israel",
        "value": "IL",
        "name": "Israel",
        "currencyCountries": "ILS",
        "alpha3Code": "ISR"
    },
    {
        "label": "Italy",
        "value": "IT",
        "name": "Italy",
        "currencyCountries": "EUR",
        "alpha3Code": "ITA"
    },
    {
        "label": "Jamaica",
        "value": "JM",
        "name": "Jamaica",
        "currencyCountries": "JMD",
        "alpha3Code": "JAM"
    },
    {
        "label": "Japan",
        "value": "JP",
        "name": "Japan",
        "currencyCountries": "JPY",
        "alpha3Code": "JPN"
    },
    {
        "label": "Jersey",
        "value": "JE",
        "name": "Jersey",
        "currencyCountries": "GBP",
        "alpha3Code": "JEY"
    },
    {
        "label": "Jordan",
        "value": "JO",
        "name": "Jordan",
        "currencyCountries": "JOD",
        "alpha3Code": "JOR"
    },
    {
        "label": "Kazakhstan",
        "value": "KZ",
        "name": "Kazakhstan",
        "currencyCountries": "KZT",
        "alpha3Code": "KAZ"
    },
    {
        "label": "Kenya",
        "value": "KE",
        "name": "Kenya",
        "currencyCountries": "KES",
        "alpha3Code": "KEN"
    },
    {
        "label": "Kiribati",
        "value": "KI",
        "name": "Kiribati",
        "currencyCountries": "AUD",
        "alpha3Code": "KIR"
    },
    {
        "label": "Korea, North",
        "value": "KP",
        "name": "Korea, North",
        "currencyCountries": "KPW",
        "alpha3Code": "PRK"
    },
    {
        "label": "South Korea",
        "value": "KR",
        "name": "South Korea",
        "currencyCountries": "KRW",
        "alpha3Code": "KOR"
    },
    {
        "label": "Kuwait",
        "value": "KW",
        "name": "Kuwait",
        "currencyCountries": "KWD",
        "alpha3Code": "KWT"
    },
    {
        "label": "Kyrgyzstan",
        "value": "KG",
        "name": "Kyrgyzstan",
        "currencyCountries": "KGS",
        "alpha3Code": "KGZ"
    },
    {
        "label": "Laos",
        "value": "LA",
        "name": "Laos",
        "currencyCountries": "LAK",
        "alpha3Code": "LAO"
    },
    {
        "label": "Latvia",
        "value": "LV",
        "name": "Latvia",
        "currencyCountries": "LVL",
        "alpha3Code": "LVA"
    },
    {
        "label": "Lebanon",
        "value": "LB",
        "name": "Lebanon",
        "currencyCountries": "LBP",
        "alpha3Code": "LBN"
    },
    {
        "label": "Lesotho",
        "value": "LS",
        "name": "Lesotho",
        "currencyCountries": "LSL",
        "alpha3Code": "LSO"
    },
    {
        "label": "Liberia",
        "value": "LR",
        "name": "Liberia",
        "currencyCountries": "LRD",
        "alpha3Code": "LBR"
    },
    {
        "label": "Libya",
        "value": "LY",
        "name": "Libya",
        "currencyCountries": "LYD",
        "alpha3Code": "LBY"
    },
    {
        "label": "Liechtenstein",
        "value": "LI",
        "name": "Liechtenstein",
        "currencyCountries": "CHF",
        "alpha3Code": "LIE"
    },
    {
        "label": "Lithuania",
        "value": "LT",
        "name": "Lithuania",
        "currencyCountries": "LTL",
        "alpha3Code": "LTU"
    },
    {
        "label": "Luxembourg",
        "value": "LU",
        "name": "Luxembourg",
        "currencyCountries": "EUR",
        "alpha3Code": "LUX"
    },
    {
        "label": "Macao",
        "value": "MO",
        "name": "Macao",
        "currencyCountries": "MOP",
        "alpha3Code": "MAC"
    },
    {
        "label": "Macedonia",
        "value": "MK",
        "name": "Macedonia",
        "currencyCountries": "MKD",
        "alpha3Code": "MKD"
    },
    {
        "label": "Madagascar",
        "value": "MG",
        "name": "Madagascar",
        "currencyCountries": "MGF",
        "alpha3Code": "MDG"
    },
    {
        "label": "Malawi",
        "value": "MW",
        "name": "Malawi",
        "currencyCountries": "MWK",
        "alpha3Code": "MWI"
    },
    {
        "label": "Malaysia",
        "value": "MY",
        "name": "Malaysia",
        "currencyCountries": "MYR",
        "alpha3Code": "MYS"
    },
    {
        "label": "Maldives",
        "value": "MV",
        "name": "Maldives",
        "currencyCountries": "MVR",
        "alpha3Code": "MDV"
    },
    {
        "label": "Mali",
        "value": "ML",
        "name": "Mali",
        "currencyCountries": "XOF",
        "alpha3Code": "MLI"
    },
    {
        "label": "Malta",
        "value": "MT",
        "name": "Malta",
        "currencyCountries": "EUR",
        "alpha3Code": "MLT"
    },
    {
        "label": "Marshall Islands",
        "value": "MH",
        "name": "Marshall Islands",
        "currencyCountries": "USD",
        "alpha3Code": "MHL"
    },
    {
        "label": "Martinique",
        "value": "MQ",
        "name": "Martinique",
        "currencyCountries": "EUR",
        "alpha3Code": "MTQ"
    },
    {
        "label": "Mauritania",
        "value": "MR",
        "name": "Mauritania",
        "currencyCountries": "MRO",
        "alpha3Code": "MRT"
    },
    {
        "label": "Mauritius",
        "value": "MU",
        "name": "Mauritius",
        "currencyCountries": "MUR",
        "alpha3Code": "MUS"
    },
    {
        "label": "Mayotte",
        "value": "YT",
        "name": "Mayotte",
        "currencyCountries": "EUR",
        "alpha3Code": "MYT"
    },
    {
        "label": "Mexico",
        "value": "MX",
        "name": "Mexico",
        "currencyCountries": "MXN",
        "alpha3Code": "MEX"
    },
    {
        "label": "Micronesia, Federated States of",
        "value": "FM",
        "name": "Micronesia, Federated States of",
        "currencyCountries": "USD",
        "alpha3Code": "FSM"
    },
    {
        "label": "Moldova",
        "value": "MD",
        "name": "Moldova",
        "currencyCountries": "MDL",
        "alpha3Code": "MDA"
    },
    {
        "label": "Monaco",
        "value": "MC",
        "name": "Monaco",
        "currencyCountries": "EUR",
        "alpha3Code": "MCO"
    },
    {
        "label": "Mongolia",
        "value": "MN",
        "name": "Mongolia",
        "currencyCountries": "MNT",
        "alpha3Code": "MNG"
    },
    {
        "label": "Montenegro",
        "value": "ME",
        "name": "Montenegro",
        "currencyCountries": "EUR",
        "alpha3Code": "MNE"
    },
    {
        "label": "Montserrat",
        "value": "MS",
        "name": "Montserrat",
        "currencyCountries": "XCD",
        "alpha3Code": "MSR"
    },
    {
        "label": "Morocco",
        "value": "MA",
        "name": "Morocco",
        "currencyCountries": "MAD",
        "alpha3Code": "MAR"
    },
    {
        "label": "Mozambique",
        "value": "MZ",
        "name": "Mozambique",
        "currencyCountries": "MZN",
        "alpha3Code": "MOZ"
    },
    {
        "label": "Myanmar",
        "value": "MM",
        "name": "Myanmar",
        "currencyCountries": "MMK",
        "alpha3Code": "MMR"
    },
    {
        "label": "Namibia",
        "value": "NA",
        "name": "Namibia",
        "currencyCountries": "NAD",
        "alpha3Code": "NAM"
    },
    {
        "label": "Nauru",
        "value": "NR",
        "name": "Nauru",
        "currencyCountries": "AUD",
        "alpha3Code": "NRU"
    },
    {
        "label": "Nepal",
        "value": "NP",
        "name": "Nepal",
        "currencyCountries": "NPR",
        "alpha3Code": "NPL"
    },
    {
        "label": "Netherlands",
        "value": "NL",
        "name": "Netherlands",
        "currencyCountries": "EUR",
        "alpha3Code": "NLD"
    },
    {
        "label": "New Caledonia",
        "value": "NC",
        "name": "New Caledonia",
        "currencyCountries": "XPF",
        "alpha3Code": "NCL"
    },
    {
        "label": "New Zealand",
        "value": "NZ",
        "name": "New Zealand",
        "currencyCountries": "NZD",
        "alpha3Code": "NZL"
    },
    {
        "label": "Nicaragua",
        "value": "NI",
        "name": "Nicaragua",
        "currencyCountries": "NIO",
        "alpha3Code": "NIC"
    },
    {
        "label": "Niger",
        "value": "NE",
        "name": "Niger",
        "currencyCountries": "XOF",
        "alpha3Code": "NER"
    },
    {
        "label": "Nigeria",
        "value": "NG",
        "name": "Nigeria",
        "currencyCountries": "NGN",
        "alpha3Code": "NGA"
    },
    {
        "label": "Niue",
        "value": "NU",
        "name": "Niue",
        "currencyCountries": "NZD",
        "alpha3Code": "NIU"
    },
    {
        "label": "Norfolk Island",
        "value": "NF",
        "name": "Norfolk Island",
        "currencyCountries": "AUD",
        "alpha3Code": "NFK"
    },
    {
        "label": "Northern Mariana Islands",
        "value": "MP",
        "name": "Northern Mariana Islands",
        "currencyCountries": "USD",
        "alpha3Code": "MNP"
    },
    {
        "label": "Norway",
        "value": "NO",
        "name": "Norway",
        "currencyCountries": "NOK",
        "alpha3Code": "NOR"
    },
    {
        "label": "Oman",
        "value": "OM",
        "name": "Oman",
        "currencyCountries": "OMR",
        "alpha3Code": "OMN"
    },
    {
        "label": "Pakistan",
        "value": "PK",
        "name": "Pakistan",
        "currencyCountries": "PKR",
        "alpha3Code": "PAK"
    },
    {
        "label": "Palau",
        "value": "PW",
        "name": "Palau",
        "currencyCountries": "USD",
        "alpha3Code": "PLW"
    },
    {
        "label": "Palestine, State of",
        "value": "PS",
        "name": "Palestine, State of",
        "currencyCountries": "",
        "alpha3Code": "PSE"
    },
    {
        "label": "Panama",
        "value": "PA",
        "name": "Panama",
        "currencyCountries": "PAB",
        "alpha3Code": "PAN"
    },
    {
        "label": "Papua New Guinea",
        "value": "PG",
        "name": "Papua New Guinea",
        "currencyCountries": "PGK",
        "alpha3Code": "PNG"
    },
    {
        "label": "Paraguay",
        "value": "PY",
        "name": "Paraguay",
        "currencyCountries": "PYG",
        "alpha3Code": "PRY"
    },
    {
        "label": "Peru",
        "value": "PE",
        "name": "Peru",
        "currencyCountries": "PEN",
        "alpha3Code": "PER"
    },
    {
        "label": "Philippines",
        "value": "PH",
        "name": "Philippines",
        "currencyCountries": "PHP",
        "alpha3Code": "PHL"
    },
    {
        "label": "Pitcairn",
        "value": "PN",
        "name": "Pitcairn",
        "currencyCountries": "NZD",
        "alpha3Code": "PCN"
    },
    {
        "label": "Poland",
        "value": "PL",
        "name": "Poland",
        "currencyCountries": "PLN",
        "alpha3Code": "POL"
    },
    {
        "label": "Portugal",
        "value": "PT",
        "name": "Portugal",
        "currencyCountries": "EUR",
        "alpha3Code": "PRT"
    },
    {
        "label": "Puerto Rico",
        "value": "PR",
        "name": "Puerto Rico",
        "currencyCountries": "USD",
        "alpha3Code": "PRI"
    },
    {
        "label": "Qatar",
        "value": "QA",
        "name": "Qatar",
        "currencyCountries": "QAR",
        "alpha3Code": "QAT"
    },
    {
        "label": "Reunion",
        "value": "RE",
        "name": "Reunion",
        "currencyCountries": "EUR",
        "alpha3Code": "REU"
    },
    {
        "label": "Romania",
        "value": "RO",
        "name": "Romania",
        "currencyCountries": "RON",
        "alpha3Code": "ROU"
    },
    {
        "label": "Russia",
        "value": "RU",
        "name": "Russia",
        "currencyCountries": "RUB",
        "alpha3Code": "RUS"
    },
    {
        "label": "Rwanda",
        "value": "RW",
        "name": "Rwanda",
        "currencyCountries": "RWF",
        "alpha3Code": "RWA"
    },
    {
        "label": "Saint Barthelemy",
        "value": "BL",
        "name": "Saint Barthelemy",
        "currencyCountries": "",
        "alpha3Code": "BLM"
    },
    {
        "label": "Saint Helena",
        "value": "SH",
        "name": "Saint Helena",
        "currencyCountries": "SHP",
        "alpha3Code": "SHN"
    },
    {
        "label": "Saint Kitts and Nevis",
        "value": "KN",
        "name": "Saint Kitts and Nevis",
        "currencyCountries": "XCD",
        "alpha3Code": "KNA"
    },
    {
        "label": "Saint Lucia",
        "value": "LC",
        "name": "Saint Lucia",
        "currencyCountries": "XCD",
        "alpha3Code": "LCA"
    },
    {
        "label": "Saint Martin (France)",
        "value": "MF",
        "name": "Saint Martin (France)",
        "currencyCountries": "",
        "alpha3Code": "MAF"
    },
    {
        "label": "Saint Pierre and Miquelon",
        "value": "PM",
        "name": "Saint Pierre and Miquelon",
        "currencyCountries": "EUR",
        "alpha3Code": "SPM"
    },
    {
        "label": "Saint Vincent and the Grenadines",
        "value": "VC",
        "name": "Saint Vincent and the Grenadines",
        "currencyCountries": "XCD",
        "alpha3Code": "VCT"
    },
    {
        "label": "Samoa",
        "value": "WS",
        "name": "Samoa",
        "currencyCountries": "WST",
        "alpha3Code": "WSM"
    },
    {
        "label": "San Marino",
        "value": "SM",
        "name": "San Marino",
        "currencyCountries": "EUR",
        "alpha3Code": "SMR"
    },
    {
        "label": "Sao Tome and Principe",
        "value": "ST",
        "name": "Sao Tome and Principe",
        "currencyCountries": "STD",
        "alpha3Code": "STP"
    },
    {
        "label": "Saudi Arabia",
        "value": "SA",
        "name": "Saudi Arabia",
        "currencyCountries": "SAR",
        "alpha3Code": "SAU"
    },
    {
        "label": "Senegal",
        "value": "SN",
        "name": "Senegal",
        "currencyCountries": "XOF",
        "alpha3Code": "SEN"
    },
    {
        "label": "Serbia",
        "value": "RS",
        "name": "Serbia",
        "currencyCountries": "RSD",
        "alpha3Code": "SRB"
    },
    {
        "label": "Seychelles",
        "value": "SC",
        "name": "Seychelles",
        "currencyCountries": "SCR",
        "alpha3Code": "SYC"
    },
    {
        "label": "Sierra Leone",
        "value": "SL",
        "name": "Sierra Leone",
        "currencyCountries": "SLL",
        "alpha3Code": "SLE"
    },
    {
        "label": "Singapore",
        "value": "SG",
        "name": "Singapore",
        "currencyCountries": "SGD",
        "alpha3Code": "SGP"
    },
    {
        "label": "Sint Maarten (Netherlands)",
        "value": "SX",
        "name": "Sint Maarten (Netherlands)",
        "currencyCountries": "",
        "alpha3Code": "SXM"
    },
    {
        "label": "Slovakia",
        "value": "SK",
        "name": "Slovakia",
        "currencyCountries": "EUR",
        "alpha3Code": "SVK"
    },
    {
        "label": "Slovenia",
        "value": "SI",
        "name": "Slovenia",
        "currencyCountries": "EUR",
        "alpha3Code": "SVN"
    },
    {
        "label": "Solomon Islands",
        "value": "SB",
        "name": "Solomon Islands",
        "currencyCountries": "SBD",
        "alpha3Code": "SLB"
    },
    {
        "label": "Somalia",
        "value": "SO",
        "name": "Somalia",
        "currencyCountries": "SOS",
        "alpha3Code": "SOM"
    },
    {
        "label": "South Africa",
        "value": "ZA",
        "name": "South Africa",
        "currencyCountries": "ZAR",
        "alpha3Code": "ZAF"
    },
    {
        "label": "South Georgia and the South Sandwich Islands",
        "value": "GS",
        "name": "South Georgia and the South Sandwich Islands",
        "currencyCountries": "",
        "alpha3Code": "SGS"
    },
    {
        "label": "Spain",
        "value": "ES",
        "name": "Spain",
        "currencyCountries": "EUR",
        "alpha3Code": "ESP"
    },
    {
        "label": "Sri Lanka",
        "value": "LK",
        "name": "Sri Lanka",
        "currencyCountries": "LKR",
        "alpha3Code": "LKA"
    },
    {
        "label": "Sudan",
        "value": "SD",
        "name": "Sudan",
        "currencyCountries": "SDG",
        "alpha3Code": "SDN"
    },
    {
        "label": "Suriname",
        "value": "SR",
        "name": "Suriname",
        "currencyCountries": "SRD",
        "alpha3Code": "SUR"
    },
    {
        "label": "Svalbard and Jan Mayen",
        "value": "SJ",
        "name": "Svalbard and Jan Mayen",
        "currencyCountries": "NOK",
        "alpha3Code": "SJM"
    },
    {
        "label": "Swaziland",
        "value": "SZ",
        "name": "Swaziland",
        "currencyCountries": "SZL",
        "alpha3Code": "SWZ"
    },
    {
        "label": "Sweden",
        "value": "SE",
        "name": "Sweden",
        "currencyCountries": "SEK",
        "alpha3Code": "SWE"
    },
    {
        "label": "Switzerland",
        "value": "CH",
        "name": "Switzerland",
        "currencyCountries": "CHF",
        "alpha3Code": "CHE"
    },
    {
        "label": "Syria",
        "value": "SY",
        "name": "Syria",
        "currencyCountries": "SYP",
        "alpha3Code": "SYR"
    },
    {
        "label": "Taiwan",
        "value": "TW",
        "name": "Taiwan",
        "currencyCountries": "TWD",
        "alpha3Code": "TWN"
    },
    {
        "label": "Tajikistan",
        "value": "TJ",
        "name": "Tajikistan",
        "currencyCountries": "TJS",
        "alpha3Code": "TJK"
    },
    {
        "label": "Tanzania",
        "value": "TZ",
        "name": "Tanzania",
        "currencyCountries": "TZS",
        "alpha3Code": "TZA"
    },
    {
        "label": "Thailand",
        "value": "TH",
        "name": "Thailand",
        "currencyCountries": "THB",
        "alpha3Code": "THA"
    },
    {
        "label": "Timor-Leste",
        "value": "TL",
        "name": "Timor-Leste",
        "currencyCountries": "",
        "alpha3Code": "TLS"
    },
    {
        "label": "Togo",
        "value": "TG",
        "name": "Togo",
        "currencyCountries": "XOF",
        "alpha3Code": "TGO"
    },
    {
        "label": "Tokelau",
        "value": "TK",
        "name": "Tokelau",
        "currencyCountries": "NZD",
        "alpha3Code": "TKL"
    },
    {
        "label": "Tonga",
        "value": "TO",
        "name": "Tonga",
        "currencyCountries": "TOP",
        "alpha3Code": "TON"
    },
    {
        "label": "Trinidad and Tobago",
        "value": "TT",
        "name": "Trinidad and Tobago",
        "currencyCountries": "TTD",
        "alpha3Code": "TTO"
    },
    {
        "label": "Tunisia",
        "value": "TN",
        "name": "Tunisia",
        "currencyCountries": "TND",
        "alpha3Code": "TUN"
    },
    {
        "label": "Turkey",
        "value": "TR",
        "name": "Turkey",
        "currencyCountries": "TRY",
        "alpha3Code": "TUR"
    },
    {
        "label": "Turkmenistan",
        "value": "TM",
        "name": "Turkmenistan",
        "currencyCountries": "TMT",
        "alpha3Code": "TKM"
    },
    {
        "label": "Turks and Caicos Islands",
        "value": "TC",
        "name": "Turks and Caicos Islands",
        "currencyCountries": "USD",
        "alpha3Code": "TCA"
    },
    {
        "label": "Tuvalu",
        "value": "TV",
        "name": "Tuvalu",
        "currencyCountries": "AUD",
        "alpha3Code": "TUV"
    },
    {
        "label": "Uganda",
        "value": "UG",
        "name": "Uganda",
        "currencyCountries": "UGX",
        "alpha3Code": "UGA"
    },
    {
        "label": "Ukraine",
        "value": "UA",
        "name": "Ukraine",
        "currencyCountries": "UAH",
        "alpha3Code": "UKR"
    },
    {
        "label": "United Arab Emirates",
        "value": "AE",
        "name": "United Arab Emirates",
        "currencyCountries": "AED",
        "alpha3Code": "ARE"
    },
    {
        "label": "United Kingdom",
        "value": "GB",
        "name": "United Kingdom",
        "currencyCountries": "GBP",
        "alpha3Code": "GBR"
    },
    {
        "label": "United States",
        "value": "US",
        "name": "United States",
        "currencyCountries": "USD",
        "alpha3Code": "USA"
    },
    {
        "label": "United States Minor Outlying Islands",
        "value": "UM",
        "name": "United States Minor Outlying Islands",
        "currencyCountries": "USD",
        "alpha3Code": "UMI"
    },
    {
        "label": "Uruguay",
        "value": "UY",
        "name": "Uruguay",
        "currencyCountries": "UYU",
        "alpha3Code": "URY"
    },
    {
        "label": "Uzbekistan",
        "value": "UZ",
        "name": "Uzbekistan",
        "currencyCountries": "UZS",
        "alpha3Code": "UZB"
    },
    {
        "label": "Vanuatu",
        "value": "VU",
        "name": "Vanuatu",
        "currencyCountries": "VUV",
        "alpha3Code": "VUT"
    },
    {
        "label": "Venezuela",
        "value": "VE",
        "name": "Venezuela",
        "currencyCountries": "VES",
        "alpha3Code": "VEN"
    },
    {
        "label": "Vietnam",
        "value": "VN",
        "name": "Vietnam",
        "currencyCountries": "VND",
        "alpha3Code": "VNM"
    },
    {
        "label": "Virgin Islands, British",
        "value": "VG",
        "name": "Virgin Islands, British",
        "currencyCountries": "USD",
        "alpha3Code": "VGB"
    },
    {
        "label": "Virgin Islands, U.S.",
        "value": "VI",
        "name": "Virgin Islands, U.S.",
        "currencyCountries": "USD",
        "alpha3Code": "VIR"
    },
    {
        "label": "Wallis and Futuna",
        "value": "WF",
        "name": "Wallis and Futuna",
        "currencyCountries": "XPF",
        "alpha3Code": "WLF"
    },
    {
        "label": "Western Sahara",
        "value": "EH",
        "name": "Western Sahara",
        "currencyCountries": "MAD",
        "alpha3Code": "ESH"
    },
    {
        "label": "Yemen",
        "value": "YE",
        "name": "Yemen",
        "currencyCountries": "YER",
        "alpha3Code": "YEM"
    },
    {
        "label": "Zambia",
        "value": "ZM",
        "name": "Zambia",
        "currencyCountries": "ZMW",
        "alpha3Code": "ZMB"
    },
    {
        "label": "Zimbabwe",
        "value": "ZW",
        "name": "Zimbabwe",
        "currencyCountries": "ZWD",
        "alpha3Code": "ZWE"
    },
    {
        "label": "England",
        "value": "GB",
        "name": "England",
        "currencyCountries": "GBP",
        "alpha3Code": "GBR"
    },
    {
        "label": "Northern Ireland",
        "value": "XI",
        "name": "Northern Ireland",
        "currencyCountries": "",
        "alpha3Code": ""
    },
    {
        "label": "Scotland",
        "value": "GB",
        "name": "Scotland",
        "currencyCountries": "GBP",
        "alpha3Code": "GBR"
    },
    {
        "label": "Wales",
        "value": "GB",
        "name": "Wales",
        "currencyCountries": "GBP",
        "alpha3Code": "GBR"
    },
    {
        "label": "Great Britain",
        "value": "GB",
        "name": "Great Britain",
        "currencyCountries": "GBP",
        "alpha3Code": "GBR"
    },
    {
        "label": "South Sudan",
        "value": "SS",
        "name": "South Sudan",
        "currencyCountries": "SSP",
        "alpha3Code": "SSD"
    },
    {
        "label": "Czechoslovakia",
        "value": "CS",
        "name": "Czechoslovakia",
        "currencyCountries": "CZK",
        "alpha3Code": "CSK"
    },
    {
        "label": "USSR",
        "value": "SU",
        "name": "USSR",
        "currencyCountries": "",
        "alpha3Code": "SUN"
    },
    {
        "label": "Yugoslavia",
        "value": "YU",
        "name": "Yugoslavia",
        "currencyCountries": "",
        "alpha3Code": "YUG"
    },
    {
        "label": "Kosovo",
        "value": "XK",
        "name": "Kosovo",
        "currencyCountries": "",
        "alpha3Code": "XKX"
    },
    {
        "label": "Turkish Republic of Northern Cyprus",
        "value": "XC",
        "name": "Turkish Republic of Northern Cyprus",
        "currencyCountries": "",
        "alpha3Code": ""
    },
    {
        "label": "South Ossetia",
        "value": "XC",
        "name": "South Ossetia",
        "currencyCountries": "GEL",
        "alpha3Code": "GEO"
    }
])]

// const statusOption = [
//     {
//         "label": "All",
//         "value": 0
//     },
//     {
//         "label": "Canceled",
//         "value": -1
//     },
//     {
//         "label": "Finished",
//         "value": 1
//     },
//     {
//         "label": "Live",
//         "value": 2
//     },
//     {
//         "label": "Upcoming",
//         "value": 3
//     }
// ]

// const statusValue = [
//     2,
//     3
// ]

export default function Home() {
    const form = useForm();

    const [eye, setEye] = useState(false);

    const handle = useCallback((e) => console.log(e), [])

    return (
        <>
            {/* <div style={{ height: 1000 }} /> */}

            {/* <Select options={CountryCodes} getPopupContainer={() => document.body} /> */}

            <div style={{ display: 'flex' }}>

                    <Button>Button</Button>

                <div style={{ width: 500 }}></div>

                <Form form={form} onFinish={handle} size="large">
                    <Item rules={[{ required: true }]} name="gender" label="Gender">
                        <Select options={CountryCodes} />
                    </Item>

                    <Item rules={[{ required: true }]} name="country" label="country">
                        <Select options={CountryCodes} />
                    </Item>

                    <Item rules={[{ required: true }]} name="username" label="Username">
                        <Input type={!eye ? 'password' : 'text'} suffix={<span onClick={() => setEye(!eye)}>{eye ? 'show' : 'hide'}</span>} />
                    </Item>

                    <div>
                        <Item rules={[{ required: true }]} name="dfdsf" label="dzfdsf">
                            <Radio.Group onChange={(e) => console.log(e)}>
                                <Radio name="sdfdsf" value={'dsfdsf'}>Male</Radio>
                                <Radio name="Female" value={'fesdfdsfmale'}>Female</Radio>
                            </Radio.Group>
                        </Item>

                        <Item
                            name="agree"
                            label="Agree"
                            rules={[{
                                // required: true,
                                validateBooleanFalse: true,
                                validator: async (_, checked) => {
                                    if (!checked) {
                                        return Promise.reject('account.acceptAgreement');
                                    } else {
                                        Promise.resolve();
                                    }
                                }
                            }]}
                        >
                            <div>
                                <Suspense fallback={null}>
                                    <div className="checkbox" >
                                        <Checkbox>sdvcdsv</Checkbox>
                                        <div dangerouslySetInnerHTML={{
                                            __html: `<i>okokok</i>`
                                        }} />
                                    </div>
                                </Suspense>
                            </div>
                        </Item>
                    </div>
                    {/* <Item label={'dsfdsf'} name="sdfdsf">
                        <Select
                            style={{ width: 200 }}
                            // mode="tags"
                            showSearch
                            // getPopupContainer={() => document.body}
                            defaultValue={'Live'}
                            menuItemSelectedIcon={<>ok</>}
                            onSelect={(e) => { console.log(e) }}
                            onChange={(e) => { console.log(e) }}
                        >
                            {statusOption.map(item => (
                                <Option
                                    key={item.label}
                                    value={item.label}
                                >
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </Item> */}
                    <button type="submit">Submit</button>
                    <button onClick={() => form.resetFields()}>Reset</button>
                </Form>

                {/* <AntForm>
                    <AntForm.Item label={'dsfdsf'} name="sdfdsf">
                        <AntSelect
                            style={{ width: 200 }}
                            showSearch
                            // mode="tags"
                            getPopupContainer={() => document.body}
                            defaultValue={'Live'}
                        >
                            {statusOption.map(item => (
                                <AntSelect.Option
                                    key={item.label}
                                    value={item.label}
                                >
                                    {item.label}
                                </AntSelect.Option>
                            ))}
                        </AntSelect>
                    </AntForm.Item>

                    <FormItem label="Male">
                        <Radio name="gender" />
                        <Radio name="gender" />
                    </FormItem>
                </AntForm> */}
            </div>

            {/* <div style={{ height: 1000 }} /> */}
        </>
    )
}