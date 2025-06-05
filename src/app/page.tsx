'use client'

import { Select } from "../../lib/components/Select";
import { Option } from "../../lib/components/Select/Option";
import i18n from 'i18next';

export const CountryCodes = [
    {
        code: 'AF',
        alpha3Code: 'AFG',
        name: 'Afghanistan',
        get translationName() {
            return i18n.t('countries.Afghanistan');
        },
        phone_code: '93',
        lang: 'tur',
        currency: 'AFN',
        alias: 'afghanistan',
        id: 8
    },
    {
        code: 'AX',
        alpha3Code: 'ALA',
        name: 'Aland Islands',
        get translationName() {
            return i18n.t('countries.AlandIslands');
        },
        phone_code: '358 18',
        lang: '',
        currency: '',
        alias: 'aland-islands',
        id: 9
    },
    {
        code: 'AL',
        alpha3Code: 'ALB',
        name: 'Albania',
        get translationName() {
            return i18n.t('countries.Albania');
        },
        phone_code: '355',
        lang: '',
        currency: 'ALL',
        alias: 'albania',
        id: 10
    },
    {
        code: 'DZ',
        alpha3Code: 'DZA',
        name: 'Algeria',
        get translationName() {
            return i18n.t('countries.Algeria');
        },
        phone_code: '213',
        lang: 'fre',
        currency: 'DZD',
        alias: 'algeria',
        id: 11
    },
    {
        code: 'AS',
        alpha3Code: 'ASM',
        name: 'American Samoa',
        get translationName() {
            return i18n.t('countries.AmericanSamoa');
        },
        phone_code: '1 684',
        lang: '',
        currency: 'USD',
        alias: 'american-samoa',
        id: 12
    },
    {
        code: 'AD',
        alpha3Code: 'AND',
        name: 'Andorra',
        get translationName() {
            return i18n.t('countries.Andorra');
        },
        phone_code: '376',
        lang: 'fre',
        currency: 'EUR',
        alias: 'andorra',
        id: 13
    },
    {
        code: 'AO',
        alpha3Code: 'AGO',
        name: 'Angola',
        get translationName() {
            return i18n.t('countries.Angola');
        },
        phone_code: '244',
        lang: 'por',
        currency: 'AOA',
        alias: 'angola',
        id: 14
    },
    {
        code: 'AI',
        alpha3Code: 'AIA',
        name: 'Anguilla',
        get translationName() {
            return i18n.t('countries.Anguilla');
        },
        phone_code: '1 264',
        lang: '',
        currency: 'XCD',
        alias: 'anguilla',
        id: 15
    },
    {
        code: 'AG',
        alpha3Code: 'ATG',
        name: 'Antigua and Barbuda',
        get translationName() {
            return i18n.t('countries.AntiguaandBarbuda');
        },
        phone_code: '1 268',
        lang: '',
        currency: 'XCD',
        alias: 'antigua-and-barbuda',
        id: 17
    },
    {
        code: 'AR',
        alpha3Code: 'ARG',
        name: 'Argentina',
        get translationName() {
            return i18n.t('countries.Argentina');
        },
        phone_code: '54',
        lang: 'spa',
        currency: 'ARS',
        alias: 'argentina',
        id: 18
    },
    {
        code: 'AM',
        alpha3Code: 'ARM',
        name: 'Armenia',
        get translationName() {
            return i18n.t('countries.Armenia');
        },
        phone_code: '374',
        lang: 'arm',
        currency: 'AMD',
        alias: 'armenia',
        id: 19
    },
    {
        code: 'AW',
        alpha3Code: 'ABW',
        name: 'Aruba',
        get translationName() {
            return i18n.t('countries.Aruba');
        },
        phone_code: '297',
        lang: '',
        currency: 'AWG',
        alias: 'aruba',
        id: 20
    },
    {
        code: 'AU',
        alpha3Code: 'AUS',
        name: 'Australia',
        get translationName() {
            return i18n.t('countries.Australia');
        },
        phone_code: '61',
        lang: '',
        currency: 'AUD',
        alias: 'australia',
        id: 21
    },
    {
        code: 'AT',
        alpha3Code: 'AUT',
        name: 'Austria',
        get translationName() {
            return i18n.t('countries.Austria');
        },
        phone_code: '43',
        lang: 'ger',
        currency: 'EUR',
        alias: 'austria',
        id: 22
    },
    {
        code: 'AZ',
        alpha3Code: 'AZE',
        name: 'Azerbaijan',
        get translationName() {
            return i18n.t('countries.Azerbaijan');
        },
        phone_code: '994',
        lang: 'tur',
        currency: 'AZN',
        alias: 'azerbaijan',
        id: 23
    },
    {
        code: 'BS',
        alpha3Code: 'BHS',
        name: 'Bahamas',
        get translationName() {
            return i18n.t('countries.Bahamas');
        },
        phone_code: '1 242',
        lang: '',
        currency: 'BSD',
        alias: 'bahamas',
        id: 24
    },
    {
        code: 'BH',
        alpha3Code: 'BHR',
        name: 'Bahrain',
        get translationName() {
            return i18n.t('countries.Bahrain');
        },
        phone_code: '973',
        lang: '',
        currency: 'BHD',
        alias: 'bahrain',
        id: 25
    },
    {
        code: 'BD',
        alpha3Code: 'BGD',
        name: 'Bangladesh',
        get translationName() {
            return i18n.t('countries.Bangladesh');
        },
        phone_code: '880',
        lang: '',
        currency: 'BDT',
        alias: 'bangladesh',
        id: 26
    },
    {
        code: 'BB',
        alpha3Code: 'BRB',
        name: 'Barbados',
        get translationName() {
            return i18n.t('countries.Barbados');
        },
        phone_code: '1 246',
        lang: '',
        currency: 'BBD',
        alias: 'barbados',
        id: 27
    },
    {
        code: 'BY',
        alpha3Code: 'BLR',
        name: 'Belarus',
        get translationName() {
            return i18n.t('countries.Belarus');
        },
        phone_code: '375',
        lang: 'rus',
        currency: 'BYR',
        alias: 'belarus',
        id: 28
    },
    {
        code: 'BE',
        alpha3Code: 'BEL',
        name: 'Belgium',
        get translationName() {
            return i18n.t('countries.Belgium');
        },
        phone_code: '32',
        lang: 'fre',
        currency: 'EUR',
        alias: 'belgium',
        id: 29
    },
    {
        code: 'BZ',
        alpha3Code: 'BLZ',
        name: 'Belize',
        get translationName() {
            return i18n.t('countries.Belize');
        },
        phone_code: '501',
        lang: '',
        currency: 'BZD',
        alias: 'belize',
        id: 30
    },
    {
        code: 'BJ',
        alpha3Code: 'BEN',
        name: 'Benin',
        get translationName() {
            return i18n.t('countries.Benin');
        },
        phone_code: '229',
        lang: 'fre',
        currency: 'XOF',
        alias: 'benin',
        id: 31
    },
    {
        code: 'BM',
        alpha3Code: 'BMU',
        name: 'Bermuda',
        get translationName() {
            return i18n.t('countries.Bermuda');
        },
        phone_code: '1 441',
        lang: '',
        currency: 'BMD',
        alias: 'bermuda',
        id: 32
    },
    {
        code: 'BT',
        alpha3Code: 'BTN',
        name: 'Bhutan',
        get translationName() {
            return i18n.t('countries.Bhutan');
        },
        phone_code: '975',
        lang: '',
        currency: 'BTN',
        alias: 'bhutan',
        id: 33
    },
    {
        code: 'BO',
        alpha3Code: 'BOL',
        name: 'Bolivia',
        get translationName() {
            return i18n.t('countries.Bolivia');
        },
        phone_code: '591',
        lang: 'spa',
        currency: 'BOB',
        alias: 'bolivia',
        id: 34
    },
    {
        code: 'BQ',
        alpha3Code: 'BES',
        name: 'Bonaire',
        get translationName() {
            return i18n.t('countries.Bonaire');
        },
        phone_code: '599 7',
        lang: '',
        currency: '',
        alias: 'bonaire',
        id: 35
    },
    {
        code: 'BA',
        alpha3Code: 'BIH',
        name: 'Bosnia and Herzegovina',
        get translationName() {
            return i18n.t('countries.BosniaandHerzegovina');
        },
        phone_code: '387',
        lang: '',
        currency: 'BAM',
        alias: 'bosnia-and-herzegovina',
        id: 36
    },
    {
        code: 'BW',
        alpha3Code: 'BWA',
        name: 'Botswana',
        get translationName() {
            return i18n.t('countries.Botswana');
        },
        phone_code: '267',
        lang: '',
        currency: 'BWP',
        alias: 'botswana',
        id: 37
    },
    {
        code: 'BV',
        alpha3Code: 'BVT',
        name: 'Bouvet Island',
        get translationName() {
            return i18n.t('countries.BouvetIsland');
        },
        phone_code: '47',
        lang: '',
        currency: 'NOK',
        alias: 'bouvet-island',
        id: 38
    },
    {
        code: 'BR',
        alpha3Code: 'BRA',
        name: 'Brazil',
        get translationName() {
            return i18n.t('countries.Brazil');
        },
        phone_code: '55',
        lang: 'por',
        currency: 'BRL',
        alias: 'brazil',
        id: 39
    },
    {
        code: 'IO',
        alpha3Code: 'IOT',
        name: 'British Indian Ocean Territory',
        get translationName() {
            return i18n.t('countries.BritishIndianOceanTerritory');
        },
        phone_code: '246',
        lang: '',
        currency: 'USD',
        alias: 'british-indian-ocean-territory',
        id: 40
    },
    {
        code: 'BN',
        alpha3Code: 'BRN',
        name: 'Brunei Darussalam',
        get translationName() {
            return i18n.t('countries.BruneiDarussalam');
        },
        phone_code: '673',
        lang: '',
        currency: 'BND',
        alias: 'brunei',
        id: 41
    },
    {
        code: 'BG',
        alpha3Code: 'BGR',
        name: 'Bulgaria',
        get translationName() {
            return i18n.t('countries.Bulgaria');
        },
        phone_code: '359',
        lang: '',
        currency: 'BGN',
        alias: 'bulgaria',
        id: 42
    },
    {
        code: 'BF',
        alpha3Code: 'BFA',
        name: 'Burkina Faso',
        get translationName() {
            return i18n.t('countries.BurkinaFaso');
        },
        phone_code: '226',
        lang: 'fre',
        currency: 'XOF',
        alias: 'burkina-faso',
        id: 43
    },
    {
        code: 'BI',
        alpha3Code: 'BDI',
        name: 'Burundi',
        get translationName() {
            return i18n.t('countries.Burundi');
        },
        phone_code: '257',
        lang: 'fre',
        currency: 'BIF',
        alias: 'burundi',
        id: 44
    },
    {
        code: 'KH',
        alpha3Code: 'KHM',
        name: 'Cambodia',
        get translationName() {
            return i18n.t('countries.Cambodia');
        },
        phone_code: '855',
        lang: '',
        currency: 'KHR',
        alias: 'cambodia',
        id: 45
    },
    {
        code: 'CM',
        alpha3Code: 'CMR',
        name: 'Cameroon',
        get translationName() {
            return i18n.t('countries.Cameroon');
        },
        phone_code: '237',
        lang: '',
        currency: 'XAF',
        alias: 'cameroon',
        id: 46
    },
    {
        code: 'CA',
        alpha3Code: 'CAN',
        name: 'Canada',
        get translationName() {
            return i18n.t('countries.Canada');
        },
        phone_code: '1',
        lang: '',
        currency: 'CAD',
        alias: 'canada',
        id: 47
    },
    {
        code: 'CV',
        alpha3Code: 'CPV',
        name: 'Cabo Verde',
        get translationName() {
            return i18n.t('countries.CaboVerde');
        },
        phone_code: '238',
        lang: 'por',
        currency: 'CVE',
        alias: 'cape-verde',
        id: 48
    },
    {
        code: 'KY',
        alpha3Code: 'CYM',
        name: 'Cayman Islands',
        get translationName() {
            return i18n.t('countries.CaymanIslands');
        },
        phone_code: '1 345',
        lang: '',
        currency: 'KYD',
        alias: 'cayman-islands',
        id: 49
    },
    {
        code: 'CF',
        alpha3Code: 'CAF',
        name: 'Central African Republic',
        get translationName() {
            return i18n.t('countries.CentralAfricanRepublic');
        },
        phone_code: '236',
        lang: '',
        currency: 'XAF',
        alias: 'central-african-republic',
        id: 50
    },
    {
        code: 'TD',
        alpha3Code: 'TCD',
        name: 'Chad',
        get translationName() {
            return i18n.t('countries.Chad');
        },
        phone_code: '235',
        lang: '',
        currency: 'XAF',
        alias: 'chad',
        id: 51
    },
    {
        code: 'CL',
        alpha3Code: 'CHL',
        name: 'Chile',
        get translationName() {
            return i18n.t('countries.Chile');
        },
        phone_code: '56',
        lang: 'spa',
        currency: 'CLP',
        alias: 'chile',
        id: 52
    },
    {
        code: 'CN',
        alpha3Code: 'CHN',
        name: 'China',
        get translationName() {
            return i18n.t('countries.China');
        },
        phone_code: '86',
        lang: '',
        currency: 'CNY',
        alias: 'china',
        id: 53
    },
    {
        code: 'CX',
        alpha3Code: 'CXR',
        name: 'Christmas Island',
        get translationName() {
            return i18n.t('countries.ChristmasIsland');
        },
        phone_code: '61 89164',
        lang: '',
        currency: 'AUD',
        alias: 'christmas-island',
        id: 54
    },
    {
        code: 'CC',
        alpha3Code: 'CCK',
        name: 'Cocos (Keeling) Islands',
        get translationName() {
            return i18n.t('countries.CocosKeelingIslands');
        },
        phone_code: '61 89162',
        lang: '',
        currency: 'AUD',
        alias: 'cocos-island',
        id: 55
    },
    {
        code: 'CO',
        alpha3Code: 'COL',
        name: 'Colombia',
        get translationName() {
            return i18n.t('countries.Colombia');
        },
        phone_code: '57',
        lang: 'spa',
        currency: 'COP',
        alias: 'colombia',
        id: 56
    },
    {
        code: 'KM',
        alpha3Code: 'COM',
        name: 'Comoros',
        get translationName() {
            return i18n.t('countries.Comoros');
        },
        phone_code: '269',
        lang: '',
        currency: 'KMF',
        alias: 'comoros',
        id: 57
    },
    {
        code: 'CG',
        alpha3Code: 'COG',
        name: 'Congo',
        get translationName() {
            return i18n.t('countries.Congo');
        },
        phone_code: '242',
        lang: '',
        currency: 'XAF',
        alias: 'republic-of-the-congo',
        id: 58
    },
    {
        code: 'CD',
        alpha3Code: 'COD',
        name: 'Congo, Democratic Republic of the (Zaire)',
        get translationName() {
            return i18n.t('countries.CongoDemocraticRepublicoftheZaire');
        },
        phone_code: '243',
        lang: '',
        currency: 'CDF',
        alias: 'democratic-republic-of-congo',
        id: 59
    },
    {
        code: 'CK',
        alpha3Code: 'COK',
        name: 'Cook Islands',
        get translationName() {
            return i18n.t('countries.CookIslands');
        },
        phone_code: '682',
        lang: '',
        currency: 'NZD',
        alias: 'cook-islands',
        id: 60
    },
    {
        code: 'CR',
        alpha3Code: 'CRI',
        name: 'Costa Rica',
        get translationName() {
            return i18n.t('countries.CostaRica');
        },
        phone_code: '506',
        lang: 'spa',
        currency: 'CRC',
        alias: 'costa-rica',
        id: 61
    },
    {
        code: 'CI',
        alpha3Code: 'CIV',
        name: "Cote d'Ivoire",
        get translationName() {
            return i18n.t('countries.CotedIvoire');
        },
        phone_code: '225',
        lang: '',
        currency: 'XOF',
        alias: 'cotedivoire',
        id: 62
    },
    {
        code: 'HR',
        alpha3Code: 'HRV',
        name: 'Croatia',
        get translationName() {
            return i18n.t('countries.Croatia');
        },
        phone_code: '385',
        lang: '',
        currency: 'HRK',
        alias: 'croatia',
        id: 63
    },
    {
        code: 'CU',
        alpha3Code: 'CUB',
        name: 'Cuba',
        get translationName() {
            return i18n.t('countries.Cuba');
        },
        phone_code: '53',
        lang: 'spa',
        currency: 'CUP',
        alias: 'cuba',
        id: 64
    },
    {
        code: 'CW',
        alpha3Code: 'CUW',
        name: 'Curacao',
        get translationName() {
            return i18n.t('countries.Curacao');
        },
        phone_code: '599 9',
        lang: '',
        currency: '',
        alias: 'curacao',
        id: 65
    },
    {
        code: 'CY',
        alpha3Code: 'CYP',
        name: 'Cyprus',
        get translationName() {
            return i18n.t('countries.Cyprus');
        },
        phone_code: '357',
        lang: 'tur',
        currency: 'EUR',
        alias: 'cyprus',
        id: 66
    },
    {
        code: 'CZ',
        alpha3Code: 'CZE',
        name: 'Czech Republic',
        get translationName() {
            return i18n.t('countries.CzechRepublic');
        },
        phone_code: '420',
        lang: '',
        currency: 'CZK',
        alias: 'czech-republic',
        id: 67
    },
    {
        code: 'DK',
        alpha3Code: 'DNK',
        name: 'Denmark',
        get translationName() {
            return i18n.t('countries.Denmark');
        },
        phone_code: '45',
        lang: '',
        currency: 'DKK',
        alias: 'denmark',
        id: 68
    },
    {
        code: 'DJ',
        alpha3Code: 'DJI',
        name: 'Djibouti',
        get translationName() {
            return i18n.t('countries.Djibouti');
        },
        phone_code: '253',
        lang: '',
        currency: 'DJF',
        alias: 'djibouti',
        id: 69
    },
    {
        code: 'DM',
        alpha3Code: 'DMA',
        name: 'Dominica',
        get translationName() {
            return i18n.t('countries.Dominica');
        },
        phone_code: '1 767',
        lang: '',
        currency: 'XCD',
        alias: 'dominica',
        id: 70
    },
    {
        code: 'DO',
        alpha3Code: 'DOM',
        name: 'Dominican Republic',
        get translationName() {
            return i18n.t('countries.DominicanRepublic');
        },
        phone_code: '1 809',
        lang: 'spa',
        currency: 'DOP',
        alias: 'dominican-republic',
        id: 71
    },
    {
        code: 'EC',
        alpha3Code: 'ECU',
        name: 'Ecuador',
        get translationName() {
            return i18n.t('countries.Ecuador');
        },
        phone_code: '593',
        lang: '',
        currency: 'ECS',
        alias: 'ecuador',
        id: 72
    },
    {
        code: 'EG',
        alpha3Code: 'EGY',
        name: 'Egypt',
        get translationName() {
            return i18n.t('countries.Egypt');
        },
        phone_code: '20',
        lang: '',
        currency: 'EGP',
        alias: 'egypt',
        id: 73
    },
    {
        code: 'SV',
        alpha3Code: 'SLV',
        name: 'El Salvador',
        get translationName() {
            return i18n.t('countries.ElSalvador');
        },
        phone_code: '503',
        lang: 'spa',
        currency: 'SVC',
        alias: 'el-salvador',
        id: 74
    },
    {
        code: 'GQ',
        alpha3Code: 'GNQ',
        name: 'Equatorial Guinea',
        get translationName() {
            return i18n.t('countries.EquatorialGuinea');
        },
        phone_code: '240',
        lang: '',
        currency: 'XAF',
        alias: 'equatorial-guinea',
        id: 75
    },
    {
        code: 'ER',
        alpha3Code: 'ERI',
        name: 'Eritrea',
        get translationName() {
            return i18n.t('countries.Eritrea');
        },
        phone_code: '291',
        lang: '',
        currency: 'ERN',
        alias: 'eritrea',
        id: 76
    },
    {
        code: 'EE',
        alpha3Code: 'EST',
        name: 'Estonia',
        get translationName() {
            return i18n.t('countries.Estonia');
        },
        phone_code: '372',
        lang: 'rus',
        currency: 'EUR',
        alias: 'estonia',
        id: 77
    },
    {
        code: 'ET',
        alpha3Code: 'ETH',
        name: 'Ethiopia',
        get translationName() {
            return i18n.t('countries.Ethiopia');
        },
        phone_code: '251',
        lang: '',
        currency: 'ETB',
        alias: 'ethiopia',
        id: 78
    },
    {
        code: 'FK',
        alpha3Code: 'FLK',
        name: 'Falkland Islands (Malvinas)',
        get translationName() {
            return i18n.t('countries.FalklandIslands');
        },
        phone_code: '500',
        lang: '',
        currency: 'FKP',
        alias: 'falkland-islands',
        id: 79
    },
    {
        code: 'FO',
        alpha3Code: 'FRO',
        name: 'Faroe Islands',
        get translationName() {
            return i18n.t('countries.FaroeIslands');
        },
        phone_code: '298',
        lang: '',
        currency: 'DKK',
        alias: 'faroe-islands',
        id: 80
    },
    {
        code: 'FJ',
        alpha3Code: 'FJI',
        name: 'Fiji',
        get translationName() {
            return i18n.t('countries.Fiji');
        },
        phone_code: '679',
        lang: '',
        currency: 'FJD',
        alias: 'fiji',
        id: 81
    },
    {
        code: 'FI',
        alpha3Code: 'FIN',
        name: 'Finland',
        get translationName() {
            return i18n.t('countries.Finland');
        },
        phone_code: '358',
        lang: '',
        currency: 'EUR',
        alias: 'finland',
        id: 82
    },
    {
        code: 'FR',
        alpha3Code: 'FRA',
        name: 'France',
        get translationName() {
            return i18n.t('countries.France');
        },
        phone_code: '33',
        lang: 'fre',
        currency: 'EUR',
        alias: 'france',
        id: 83
    },
    {
        code: 'GF',
        alpha3Code: 'GUF',
        name: 'French Guiana',
        get translationName() {
            return i18n.t('countries.FrenchGuiana');
        },
        phone_code: '594',
        lang: 'fre',
        currency: 'EUR',
        alias: 'french-guiana',
        id: 84
    },
    {
        code: 'PF',
        alpha3Code: 'PYF',
        name: 'French Polynesia',
        get translationName() {
            return i18n.t('countries.FrenchPolynesia');
        },
        phone_code: '689',
        lang: '',
        currency: 'XPF',
        alias: 'french-polynesia',
        id: 85
    },
    {
        code: 'TF',
        alpha3Code: 'ATF',
        name: 'French Southern Territories',
        get translationName() {
            return i18n.t('countries.FrenchSouthernTerritories');
        },
        phone_code: '262',
        lang: '',
        currency: 'EUR',
        alias: 'french-southern-territories',
        id: 86
    },
    {
        code: 'GA',
        alpha3Code: 'GAB',
        name: 'Gabon',
        get translationName() {
            return i18n.t('countries.Gabon');
        },
        phone_code: '241',
        lang: '',
        currency: 'XAF',
        alias: 'gabon',
        id: 87
    },
    {
        code: 'GM',
        alpha3Code: 'GMB',
        name: 'Gambia',
        get translationName() {
            return i18n.t('countries.Gambia');
        },
        phone_code: '220',
        lang: '',
        currency: 'GMD',
        alias: 'gambia',
        id: 88
    },
    {
        code: 'GE',
        alpha3Code: 'GEO',
        name: 'Georgia',
        get translationName() {
            return i18n.t('countries.Georgia');
        },
        phone_code: '995',
        lang: 'rus',
        currency: 'GEL',
        alias: 'georgia',
        id: 89
    },
    {
        code: 'DE',
        alpha3Code: 'DEU',
        name: 'Germany',
        get translationName() {
            return i18n.t('countries.Germany');
        },
        phone_code: '49',
        lang: 'ger',
        currency: 'EUR',
        alias: 'germany',
        id: 90
    },
    {
        code: 'GH',
        alpha3Code: 'GHA',
        name: 'Ghana',
        get translationName() {
            return i18n.t('countries.Ghana');
        },
        phone_code: '233',
        lang: '',
        currency: 'GHS',
        alias: 'ghana',
        id: 91
    },
    {
        code: 'GI',
        alpha3Code: 'GIB',
        name: 'Gibraltar',
        get translationName() {
            return i18n.t('countries.Gibraltar');
        },
        phone_code: '350',
        lang: '',
        currency: 'GIP',
        alias: 'gibraltar',
        id: 92
    },
    {
        code: 'GR',
        alpha3Code: 'GRC',
        name: 'Greece',
        get translationName() {
            return i18n.t('countries.Greece');
        },
        phone_code: '30',
        lang: 'gre',
        currency: 'EUR',
        alias: 'greece',
        id: 93
    },
    {
        code: 'GL',
        alpha3Code: 'GRL',
        name: 'Greenland',
        get translationName() {
            return i18n.t('countries.Greenland');
        },
        phone_code: '299',
        lang: '',
        currency: 'DKK',
        alias: 'greenland',
        id: 94
    },
    {
        code: 'GD',
        alpha3Code: 'GRD',
        name: 'Grenada',
        get translationName() {
            return i18n.t('countries.Grenada');
        },
        phone_code: '1 473',
        lang: '',
        currency: 'XCD',
        alias: 'grenada',
        id: 95
    },
    {
        code: 'GP',
        alpha3Code: 'GLP',
        name: 'Guadeloupe',
        get translationName() {
            return i18n.t('countries.Guadeloupe');
        },
        phone_code: '590',
        lang: 'fre',
        currency: 'EUR',
        alias: 'france-guadeloupe',
        id: 96
    },
    {
        code: 'GU',
        alpha3Code: 'GUM',
        name: 'Guam',
        get translationName() {
            return i18n.t('countries.Guam');
        },
        phone_code: '1 671',
        lang: '',
        currency: 'USD',
        alias: 'guam',
        id: 97
    },
    {
        code: 'GT',
        alpha3Code: 'GTM',
        name: 'Guatemala',
        get translationName() {
            return i18n.t('countries.Guatemala');
        },
        phone_code: '502',
        lang: 'spa',
        currency: 'QTQ',
        alias: 'guatemala',
        id: 98
    },
    {
        code: 'GG',
        alpha3Code: 'GGY',
        name: 'Guernsey',
        get translationName() {
            return i18n.t('countries.Guernsey');
        },
        phone_code: '44 1481',
        lang: '',
        currency: 'GGP',
        alias: 'guernsey',
        id: 99
    },
    {
        code: 'GN',
        alpha3Code: 'GIN',
        name: 'Guinea',
        get translationName() {
            return i18n.t('countries.Guinea');
        },
        phone_code: '224',
        lang: '',
        currency: 'GNF',
        alias: 'guinea',
        id: 100
    },
    {
        code: 'GW',
        alpha3Code: 'GNB',
        name: 'Guinea-Bissau',
        get translationName() {
            return i18n.t('countries.GuineaBissau');
        },
        phone_code: '245',
        lang: '',
        currency: 'GWP',
        alias: 'guinea-bissau',
        id: 101
    },
    {
        code: 'GY',
        alpha3Code: 'GUY',
        name: 'Guyana',
        get translationName() {
            return i18n.t('countries.Guyana');
        },
        phone_code: '592',
        lang: '',
        currency: 'GYD',
        alias: 'guyana',
        id: 102
    },
    {
        code: 'HT',
        alpha3Code: 'HTI',
        name: 'Haiti',
        get translationName() {
            return i18n.t('countries.Haiti');
        },
        phone_code: '509',
        lang: '',
        currency: 'HTG',
        alias: 'haiti',
        id: 103
    },
    {
        code: 'HM',
        alpha3Code: 'HMD',
        name: 'Heard Island and Mcdonald Islands',
        get translationName() {
            return i18n.t('countries.HeardIslandandMcdonaldIslands');
        },
        phone_code: '',
        lang: '',
        currency: 'AUD',
        alias: 'heard-island-and-acdonald-islands',
        id: 104
    },
    {
        code: 'VA',
        alpha3Code: 'VAT',
        name: 'Holy See',
        get translationName() {
            return i18n.t('countries.HolySee');
        },
        phone_code: '379',
        lang: '',
        currency: 'EUR',
        alias: 'vatican-city',
        id: 105
    },
    {
        code: 'HN',
        alpha3Code: 'HND',
        name: 'Honduras',
        get translationName() {
            return i18n.t('countries.Honduras');
        },
        phone_code: '504',
        lang: 'spa',
        currency: 'HNL',
        alias: 'honduras',
        id: 106
    },
    {
        code: 'HK',
        alpha3Code: 'HKG',
        name: 'Hong Kong',
        get translationName() {
            return i18n.t('countries.HongKong');
        },
        phone_code: '852',
        lang: '',
        currency: 'HKD',
        alias: 'hong-kong',
        id: 107
    },
    {
        code: 'HU',
        alpha3Code: 'HUN',
        name: 'Hungary',
        get translationName() {
            return i18n.t('countries.Hungary');
        },
        phone_code: '36',
        lang: '',
        currency: 'HUF',
        alias: 'hungary',
        id: 108
    },
    {
        code: 'IS',
        alpha3Code: 'ISL',
        name: 'Iceland',
        get translationName() {
            return i18n.t('countries.Iceland');
        },
        phone_code: '354',
        lang: '',
        currency: 'ISK',
        alias: 'iceland',
        id: 109
    },
    {
        code: 'IN',
        alpha3Code: 'IND',
        name: 'India',
        get translationName() {
            return i18n.t('countries.India');
        },
        phone_code: '91',
        lang: '',
        currency: 'INR',
        alias: 'india',
        id: 110
    },
    {
        code: 'ID',
        alpha3Code: 'IDN',
        name: 'Indonesia',
        get translationName() {
            return i18n.t('countries.Indonesia');
        },
        phone_code: '62',
        lang: '',
        currency: 'IDR',
        alias: 'indonesia',
        id: 111
    },
    {
        code: 'IR',
        alpha3Code: 'IRN',
        name: 'Iran',
        get translationName() {
            return i18n.t('countries.Iran');
        },
        phone_code: '98',
        lang: '',
        currency: 'IRR',
        alias: 'iran',
        id: 112
    },
    {
        code: 'IQ',
        alpha3Code: 'IRQ',
        name: 'Iraq',
        get translationName() {
            return i18n.t('countries.Iraq');
        },
        phone_code: '964',
        lang: '',
        currency: 'IQD',
        alias: 'iraq',
        id: 113
    },
    {
        code: 'IE',
        alpha3Code: 'IRL',
        name: 'Ireland',
        get translationName() {
            return i18n.t('countries.Ireland');
        },
        phone_code: '353',
        lang: '',
        currency: 'EUR',
        alias: 'ireland',
        id: 114
    },
    {
        code: 'IM',
        alpha3Code: 'IMN',
        name: 'Isle of Man',
        get translationName() {
            return i18n.t('countries.IsleofMan');
        },
        phone_code: '44 1624',
        lang: '',
        currency: 'GBP',
        alias: 'isle-of-man',
        id: 115
    },
    {
        code: 'IL',
        alpha3Code: 'ISR',
        name: 'Israel',
        get translationName() {
            return i18n.t('countries.Israel');
        },
        phone_code: '972',
        lang: '',
        currency: 'ILS',
        alias: 'israel',
        id: 116
    },
    {
        code: 'IT',
        alpha3Code: 'ITA',
        name: 'Italy',
        get translationName() {
            return i18n.t('countries.Italy');
        },
        phone_code: '39',
        lang: 'ita',
        currency: 'EUR',
        alias: 'italy',
        id: 117
    },
    {
        code: 'JM',
        alpha3Code: 'JAM',
        name: 'Jamaica',
        get translationName() {
            return i18n.t('countries.Jamaica');
        },
        phone_code: '1 876',
        lang: '',
        currency: 'JMD',
        alias: 'jamaica',
        id: 118
    },
    {
        code: 'JP',
        alpha3Code: 'JPN',
        name: 'Japan',
        get translationName() {
            return i18n.t('countries.Japan');
        },
        phone_code: '81',
        lang: '',
        currency: 'JPY',
        alias: 'japan',
        id: 119
    },
    {
        code: 'JE',
        alpha3Code: 'JEY',
        name: 'Jersey',
        get translationName() {
            return i18n.t('countries.Jersey');
        },
        phone_code: '44 1534',
        lang: '',
        currency: 'GBP',
        alias: 'jersey',
        id: 120
    },
    {
        code: 'JO',
        alpha3Code: 'JOR',
        name: 'Jordan',
        get translationName() {
            return i18n.t('countries.Jordan');
        },
        phone_code: '962',
        lang: '',
        currency: 'JOD',
        alias: 'jordan',
        id: 121
    },
    {
        code: 'KZ',
        alpha3Code: 'KAZ',
        name: 'Kazakhstan',
        get translationName() {
            return i18n.t('countries.Kazakhstan');
        },
        phone_code: '7',
        lang: 'rus',
        currency: 'KZT',
        alias: 'kazakhstan',
        id: 122
    },
    {
        code: 'KE',
        alpha3Code: 'KEN',
        name: 'Kenya',
        get translationName() {
            return i18n.t('countries.Kenya');
        },
        phone_code: '254',
        lang: '',
        currency: 'KES',
        alias: 'kenya',
        id: 123
    },
    {
        code: 'KI',
        alpha3Code: 'KIR',
        name: 'Kiribati',
        get translationName() {
            return i18n.t('countries.Kiribati');
        },
        phone_code: '686',
        lang: '',
        currency: 'AUD',
        alias: 'kiribati',
        id: 124
    },
    {
        code: 'KP',
        alpha3Code: 'PRK',
        name: 'Korea, North',
        get translationName() {
            return i18n.t('countries.KoreaNorth');
        },
        phone_code: '850',
        lang: '',
        currency: 'KPW',
        alias: 'north-korea',
        id: 125
    },
    {
        code: 'KR',
        alpha3Code: 'KOR',
        name: 'South Korea',
        get translationName() {
            return i18n.t('countries.SouthKorea');
        },
        phone_code: '82',
        lang: '',
        currency: 'KRW',
        alias: 'south-korea',
        id: 126
    },
    {
        code: 'KW',
        alpha3Code: 'KWT',
        name: 'Kuwait',
        get translationName() {
            return i18n.t('countries.Kuwait');
        },
        phone_code: '965',
        lang: '',
        currency: 'KWD',
        alias: 'kuwait',
        id: 127
    },
    {
        code: 'KG',
        alpha3Code: 'KGZ',
        name: 'Kyrgyzstan',
        get translationName() {
            return i18n.t('countries.Kyrgyzstan');
        },
        phone_code: '996',
        lang: 'rus',
        currency: 'KGS',
        alias: 'kyrgyzstan',
        id: 128
    },
    {
        code: 'LA',
        alpha3Code: 'LAO',
        name: 'Laos',
        get translationName() {
            return i18n.t('countries.Laos');
        },
        phone_code: '856',
        lang: '',
        currency: 'LAK',
        alias: 'laos',
        id: 129
    },
    {
        code: 'LV',
        alpha3Code: 'LVA',
        name: 'Latvia',
        get translationName() {
            return i18n.t('countries.Latvia');
        },
        phone_code: '371',
        lang: 'rus',
        currency: 'LVL',
        alias: 'latvia',
        id: 130
    },
    {
        code: 'LB',
        alpha3Code: 'LBN',
        name: 'Lebanon',
        get translationName() {
            return i18n.t('countries.Lebanon');
        },
        phone_code: '961',
        lang: '',
        currency: 'LBP',
        alias: 'lebanon',
        id: 131
    },
    {
        code: 'LS',
        alpha3Code: 'LSO',
        name: 'Lesotho',
        get translationName() {
            return i18n.t('countries.Lesotho');
        },
        phone_code: '266',
        lang: '',
        currency: 'LSL',
        alias: 'lesotho',
        id: 132
    },
    {
        code: 'LR',
        alpha3Code: 'LBR',
        name: 'Liberia',
        get translationName() {
            return i18n.t('countries.Liberia');
        },
        phone_code: '231',
        lang: '',
        currency: 'LRD',
        alias: 'liberia',
        id: 133
    },
    {
        code: 'LY',
        alpha3Code: 'LBY',
        name: 'Libya',
        get translationName() {
            return i18n.t('countries.Libya');
        },
        phone_code: '218',
        lang: 'ita',
        currency: 'LYD',
        alias: 'libya',
        id: 134
    },
    {
        code: 'LI',
        alpha3Code: 'LIE',
        name: 'Liechtenstein',
        get translationName() {
            return i18n.t('countries.Liechtenstein');
        },
        phone_code: '423',
        lang: '',
        currency: 'CHF',
        alias: 'liechtenstein',
        id: 135
    },
    {
        code: 'LT',
        alpha3Code: 'LTU',
        name: 'Lithuania',
        get translationName() {
            return i18n.t('countries.Lithuania');
        },
        phone_code: '370',
        lang: 'rus',
        currency: 'LTL',
        alias: 'lithuania',
        id: 136
    },
    {
        code: 'LU',
        alpha3Code: 'LUX',
        name: 'Luxembourg',
        get translationName() {
            return i18n.t('countries.Luxembourg');
        },
        phone_code: '352',
        lang: 'fre',
        currency: 'EUR',
        alias: 'luxembourg',
        id: 137
    },
    {
        code: 'MO',
        alpha3Code: 'MAC',
        name: 'Macao',
        get translationName() {
            return i18n.t('countries.Macao');
        },
        phone_code: '853',
        lang: '',
        currency: 'MOP',
        alias: 'macao',
        id: 138
    },
    {
        code: 'MK',
        alpha3Code: 'MKD',
        name: 'Macedonia',
        get translationName() {
            return i18n.t('countries.Macedonia');
        },
        phone_code: '389',
        lang: '',
        currency: 'MKD',
        alias: 'republic-of-macedonia',
        id: 139
    },
    {
        code: 'MG',
        alpha3Code: 'MDG',
        name: 'Madagascar',
        get translationName() {
            return i18n.t('countries.Madagascar');
        },
        phone_code: '261',
        lang: '',
        currency: 'MGF',
        alias: 'madagascar',
        id: 140
    },
    {
        code: 'MW',
        alpha3Code: 'MWI',
        name: 'Malawi',
        get translationName() {
            return i18n.t('countries.Malawi');
        },
        phone_code: '265',
        lang: '',
        currency: 'MWK',
        alias: 'malawi',
        id: 141
    },
    {
        code: 'MY',
        alpha3Code: 'MYS',
        name: 'Malaysia',
        get translationName() {
            return i18n.t('countries.Malaysia');
        },
        phone_code: '60',
        lang: '',
        currency: 'MYR',
        alias: 'malaysia',
        id: 142
    },
    {
        code: 'MV',
        alpha3Code: 'MDV',
        name: 'Maldives',
        get translationName() {
            return i18n.t('countries.Maldives');
        },
        phone_code: '960',
        lang: '',
        currency: 'MVR',
        alias: 'maldives',
        id: 143
    },
    {
        code: 'ML',
        alpha3Code: 'MLI',
        name: 'Mali',
        get translationName() {
            return i18n.t('countries.Mali');
        },
        phone_code: '223',
        lang: '',
        currency: 'XOF',
        alias: 'mali',
        id: 144
    },
    {
        code: 'MT',
        alpha3Code: 'MLT',
        name: 'Malta',
        get translationName() {
            return i18n.t('countries.Malta');
        },
        phone_code: '356',
        lang: 'eng',
        currency: 'EUR',
        alias: 'malta',
        id: 145
    },
    {
        code: 'MH',
        alpha3Code: 'MHL',
        name: 'Marshall Islands',
        get translationName() {
            return i18n.t('countries.MarshallIslands');
        },
        phone_code: '692',
        lang: '',
        currency: 'USD',
        alias: 'marshall-island',
        id: 146
    },
    {
        code: 'MQ',
        alpha3Code: 'MTQ',
        name: 'Martinique',
        get translationName() {
            return i18n.t('countries.Martinique');
        },
        phone_code: '596',
        lang: 'fre',
        currency: 'EUR',
        alias: 'martinique',
        id: 147
    },
    {
        code: 'MR',
        alpha3Code: 'MRT',
        name: 'Mauritania',
        get translationName() {
            return i18n.t('countries.Mauritania');
        },
        phone_code: '222',
        lang: '',
        currency: 'MRO',
        alias: 'mauritania',
        id: 148
    },
    {
        code: 'MU',
        alpha3Code: 'MUS',
        name: 'Mauritius',
        get translationName() {
            return i18n.t('countries.Mauritius');
        },
        phone_code: '230',
        lang: '',
        currency: 'MUR',
        alias: 'mauritius',
        id: 149
    },
    {
        code: 'YT',
        alpha3Code: 'MYT',
        name: 'Mayotte',
        get translationName() {
            return i18n.t('countries.Mayotte');
        },
        phone_code: '262',
        lang: '',
        currency: 'EUR',
        alias: 'mayotte',
        id: 150
    },
    {
        code: 'MX',
        alpha3Code: 'MEX',
        name: 'Mexico',
        get translationName() {
            return i18n.t('countries.Mexico');
        },
        phone_code: '52',
        lang: 'spa',
        currency: 'MXN',
        alias: 'mexico',
        id: 151
    },
    {
        code: 'FM',
        alpha3Code: 'FSM',
        name: 'Micronesia, Federated States of',
        get translationName() {
            return i18n.t('countries.MicronesiaFederatedStatesof');
        },
        phone_code: '691',
        lang: '',
        currency: 'USD',
        alias: 'micronesia',
        id: 152
    },
    {
        code: 'MD',
        alpha3Code: 'MDA',
        name: 'Moldova',
        get translationName() {
            return i18n.t('countries.Moldova');
        },
        phone_code: '373',
        lang: 'rus',
        currency: 'MDL',
        alias: 'moldova',
        id: 153
    },
    {
        code: 'MC',
        alpha3Code: 'MCO',
        name: 'Monaco',
        get translationName() {
            return i18n.t('countries.Monaco');
        },
        phone_code: '377',
        lang: '',
        currency: 'EUR',
        alias: 'monaco',
        id: 154
    },
    {
        code: 'MN',
        alpha3Code: 'MNG',
        name: 'Mongolia',
        get translationName() {
            return i18n.t('countries.Mongolia');
        },
        phone_code: '976',
        lang: 'rus',
        currency: 'MNT',
        alias: 'mongolia',
        id: 155
    },
    {
        code: 'ME',
        alpha3Code: 'MNE',
        name: 'Montenegro',
        get translationName() {
            return i18n.t('countries.Montenegro');
        },
        phone_code: '382',
        lang: '',
        currency: 'EUR',
        alias: 'montenegro',
        id: 156
    },
    {
        code: 'MS',
        alpha3Code: 'MSR',
        name: 'Montserrat',
        get translationName() {
            return i18n.t('countries.Montserrat');
        },
        phone_code: '1 664',
        lang: '',
        currency: 'XCD',
        alias: 'montserrat',
        id: 157
    },
    {
        code: 'MA',
        alpha3Code: 'MAR',
        name: 'Morocco',
        get translationName() {
            return i18n.t('countries.Morocco');
        },
        phone_code: '212',
        lang: '',
        currency: 'MAD',
        alias: 'morocco',
        id: 158
    },
    {
        code: 'MZ',
        alpha3Code: 'MOZ',
        name: 'Mozambique',
        get translationName() {
            return i18n.t('countries.Mozambique');
        },
        phone_code: '258',
        lang: '',
        currency: 'MZN',
        alias: 'mozambique',
        id: 159
    },
    {
        code: 'MM',
        alpha3Code: 'MMR',
        name: 'Myanmar',
        get translationName() {
            return i18n.t('countries.Myanmar');
        },
        phone_code: '95',
        lang: '',
        currency: 'MMK',
        alias: 'myanmar',
        id: 160
    },
    {
        code: 'NA',
        alpha3Code: 'NAM',
        name: 'Namibia',
        get translationName() {
            return i18n.t('countries.Namibia');
        },
        phone_code: '264',
        lang: '',
        currency: 'NAD',
        alias: 'namibia',
        id: 161
    },
    {
        code: 'NR',
        alpha3Code: 'NRU',
        name: 'Nauru',
        get translationName() {
            return i18n.t('countries.Nauru');
        },
        phone_code: '674',
        lang: '',
        currency: 'AUD',
        alias: 'nauru',
        id: 162
    },
    {
        code: 'NP',
        alpha3Code: 'NPL',
        name: 'Nepal',
        get translationName() {
            return i18n.t('countries.Nepal');
        },
        phone_code: '977',
        lang: '',
        currency: 'NPR',
        alias: 'nepal',
        id: 163
    },
    {
        code: 'NL',
        alpha3Code: 'NLD',
        name: 'Netherlands',
        get translationName() {
            return i18n.t('countries.Netherlands');
        },
        phone_code: '31',
        lang: '',
        currency: 'EUR',
        alias: 'netherlands',
        id: 164
    },
    {
        code: 'NC',
        alpha3Code: 'NCL',
        name: 'New Caledonia',
        get translationName() {
            return i18n.t('countries.NewCaledonia');
        },
        phone_code: '687',
        lang: '',
        currency: 'XPF',
        alias: 'new-caledonia',
        id: 165
    },
    {
        code: 'NZ',
        alpha3Code: 'NZL',
        name: 'New Zealand',
        get translationName() {
            return i18n.t('countries.NewZealand');
        },
        phone_code: '64',
        lang: '',
        currency: 'NZD',
        alias: 'new-zealand',
        id: 166
    },
    {
        code: 'NI',
        alpha3Code: 'NIC',
        name: 'Nicaragua',
        get translationName() {
            return i18n.t('countries.Nicaragua');
        },
        phone_code: '505',
        lang: 'spa',
        currency: 'NIO',
        alias: 'nicaragua',
        id: 167
    },
    {
        code: 'NE',
        alpha3Code: 'NER',
        name: 'Niger',
        get translationName() {
            return i18n.t('countries.Niger');
        },
        phone_code: '227',
        lang: '',
        currency: 'XOF',
        alias: 'niger',
        id: 168
    },
    {
        code: 'NG',
        alpha3Code: 'NGA',
        name: 'Nigeria',
        get translationName() {
            return i18n.t('countries.Nigeria');
        },
        phone_code: '234',
        lang: '',
        currency: 'NGN',
        alias: 'nigeria',
        id: 169
    },
    {
        code: 'NU',
        alpha3Code: 'NIU',
        name: 'Niue',
        get translationName() {
            return i18n.t('countries.Niue');
        },
        phone_code: '683',
        lang: '',
        currency: 'NZD',
        alias: 'niue',
        id: 170
    },
    {
        code: 'NF',
        alpha3Code: 'NFK',
        name: 'Norfolk Island',
        get translationName() {
            return i18n.t('countries.NorfolkIsland');
        },
        phone_code: '672 3',
        lang: '',
        currency: 'AUD',
        alias: 'norfolk-island',
        id: 171
    },
    {
        code: 'MP',
        alpha3Code: 'MNP',
        name: 'Northern Mariana Islands',
        get translationName() {
            return i18n.t('countries.NorthernMarianaIslands');
        },
        phone_code: '1 670',
        lang: '',
        currency: 'USD',
        alias: 'northern-marianas-islands',
        id: 172
    },
    {
        code: 'NO',
        alpha3Code: 'NOR',
        name: 'Norway',
        get translationName() {
            return i18n.t('countries.Norway');
        },
        phone_code: '47',
        lang: '',
        currency: 'NOK',
        alias: 'norway',
        id: 173
    },
    {
        code: 'OM',
        alpha3Code: 'OMN',
        name: 'Oman',
        get translationName() {
            return i18n.t('countries.Oman');
        },
        phone_code: '968',
        lang: '',
        currency: 'OMR',
        alias: 'oman',
        id: 174
    },
    {
        code: 'PK',
        alpha3Code: 'PAK',
        name: 'Pakistan',
        get translationName() {
            return i18n.t('countries.Pakistan');
        },
        phone_code: '92',
        lang: '',
        currency: 'PKR',
        alias: 'pakistan',
        id: 175
    },
    {
        code: 'PW',
        alpha3Code: 'PLW',
        name: 'Palau',
        get translationName() {
            return i18n.t('countries.Palau');
        },
        phone_code: '680',
        lang: '',
        currency: 'USD',
        alias: 'palau',
        id: 176
    },
    {
        code: 'PS',
        alpha3Code: 'PSE',
        name: 'Palestine, State of',
        get translationName() {
            return i18n.t('countries.PalestineStateof');
        },
        phone_code: '970',
        lang: '',
        currency: '',
        alias: 'palestine',
        id: 177
    },
    {
        code: 'PA',
        alpha3Code: 'PAN',
        name: 'Panama',
        get translationName() {
            return i18n.t('countries.Panama');
        },
        phone_code: '507',
        lang: 'spa',
        currency: 'PAB',
        alias: 'panama',
        id: 178
    },
    {
        code: 'PG',
        alpha3Code: 'PNG',
        name: 'Papua New Guinea',
        get translationName() {
            return i18n.t('countries.PapuaNewGuinea');
        },
        phone_code: '675',
        lang: '',
        currency: 'PGK',
        alias: 'papua-new-guinea',
        id: 179
    },
    {
        code: 'PY',
        alpha3Code: 'PRY',
        name: 'Paraguay',
        get translationName() {
            return i18n.t('countries.Paraguay');
        },
        phone_code: '595',
        lang: 'spa',
        currency: 'PYG',
        alias: 'paraguay',
        id: 180
    },
    {
        code: 'PE',
        alpha3Code: 'PER',
        name: 'Peru',
        get translationName() {
            return i18n.t('countries.Peru');
        },
        phone_code: '51',
        lang: 'spa',
        currency: 'PEN',
        alias: 'peru',
        id: 181
    },
    {
        code: 'PH',
        alpha3Code: 'PHL',
        name: 'Philippines',
        get translationName() {
            return i18n.t('countries.Philippines');
        },
        phone_code: '63',
        lang: '',
        currency: 'PHP',
        alias: 'philippines',
        id: 182
    },
    {
        code: 'PN',
        alpha3Code: 'PCN',
        name: 'Pitcairn',
        get translationName() {
            return i18n.t('countries.Pitcairn');
        },
        phone_code: '64',
        lang: '',
        currency: 'NZD',
        alias: 'pitcairn',
        id: 183
    },
    {
        code: 'PL',
        alpha3Code: 'POL',
        name: 'Poland',
        get translationName() {
            return i18n.t('countries.Poland');
        },
        phone_code: '48',
        lang: '',
        currency: 'PLN',
        alias: 'poland',
        id: 184
    },
    {
        code: 'PT',
        alpha3Code: 'PRT',
        name: 'Portugal',
        get translationName() {
            return i18n.t('countries.Portugal');
        },
        phone_code: '351',
        lang: 'por',
        currency: 'EUR',
        alias: 'portugal',
        id: 185
    },
    {
        code: 'PR',
        alpha3Code: 'PRI',
        name: 'Puerto Rico',
        get translationName() {
            return i18n.t('countries.PuertoRico');
        },
        phone_code: '1 787',
        lang: '',
        currency: 'USD',
        alias: 'puerto-rico',
        id: 186
    },
    {
        code: 'QA',
        alpha3Code: 'QAT',
        name: 'Qatar',
        get translationName() {
            return i18n.t('countries.Qatar');
        },
        phone_code: '974',
        lang: '',
        currency: 'QAR',
        alias: 'qatar',
        id: 187
    },
    {
        code: 'RE',
        alpha3Code: 'REU',
        name: 'Reunion',
        get translationName() {
            return i18n.t('countries.Reunion');
        },
        phone_code: '262',
        lang: 'fre',
        currency: 'EUR',
        alias: 'reunion',
        id: 188
    },
    {
        code: 'RO',
        alpha3Code: 'ROU',
        name: 'Romania',
        get translationName() {
            return i18n.t('countries.Romania');
        },
        phone_code: '40',
        lang: '',
        currency: 'RON',
        alias: 'romania',
        id: 189
    },
    {
        code: 'RU',
        alpha3Code: 'RUS',
        name: 'Russia',
        get translationName() {
            return i18n.t('countries.Russia');
        },
        phone_code: '7',
        lang: 'rus',
        currency: 'RUB',
        alias: 'russia',
        id: 190
    },
    {
        code: 'RW',
        alpha3Code: 'RWA',
        name: 'Rwanda',
        get translationName() {
            return i18n.t('countries.Rwanda');
        },
        phone_code: '250',
        lang: '',
        currency: 'RWF',
        alias: 'rwanda',
        id: 191
    },
    {
        code: 'BL',
        alpha3Code: 'BLM',
        name: 'Saint Barthelemy',
        get translationName() {
            return i18n.t('countries.SaintBarthelemy');
        },
        phone_code: '590',
        lang: '',
        currency: '',
        alias: 'st-barts',
        id: 192
    },
    {
        code: 'SH',
        alpha3Code: 'SHN',
        name: 'Saint Helena',
        get translationName() {
            return i18n.t('countries.SaintHelena');
        },
        phone_code: '290',
        lang: '',
        currency: 'SHP',
        alias: 'flag_of_saint_helena',
        id: 193
    },
    {
        code: 'KN',
        alpha3Code: 'KNA',
        name: 'Saint Kitts and Nevis',
        get translationName() {
            return i18n.t('countries.SaintKittsandNevis');
        },
        phone_code: '1 869',
        lang: '',
        currency: 'XCD',
        alias: 'saint-kitts-and-nevis',
        id: 194
    },
    {
        code: 'LC',
        alpha3Code: 'LCA',
        name: 'Saint Lucia',
        get translationName() {
            return i18n.t('countries.SaintLucia');
        },
        phone_code: '1 758',
        lang: '',
        currency: 'XCD',
        alias: 'saint-lucia',
        id: 195
    },
    {
        code: 'MF',
        alpha3Code: 'MAF',
        name: 'Saint Martin (France)',
        get translationName() {
            return i18n.t('countries.SaintMartinFrance');
        },
        phone_code: '590',
        lang: '',
        currency: '',
        alias: 'france-saint-martin',
        id: 196
    },
    {
        code: 'PM',
        alpha3Code: 'SPM',
        name: 'Saint Pierre and Miquelon',
        get translationName() {
            return i18n.t('countries.SaintPierreandMiquelon');
        },
        phone_code: '508',
        lang: '',
        currency: 'EUR',
        alias: 'france-miquelon',
        id: 197
    },
    {
        code: 'VC',
        alpha3Code: 'VCT',
        name: 'Saint Vincent and the Grenadines',
        get translationName() {
            return i18n.t('countries.SaintVincentandtheGrenadines');
        },
        phone_code: '1 784',
        lang: '',
        currency: 'XCD',
        alias: 'flag_of_saint_vincent',
        id: 198
    },
    {
        code: 'WS',
        alpha3Code: 'WSM',
        name: 'Samoa',
        get translationName() {
            return i18n.t('countries.Samoa');
        },
        phone_code: '685',
        lang: '',
        currency: 'WST',
        alias: 'samoa',
        id: 199
    },
    {
        code: 'SM',
        alpha3Code: 'SMR',
        name: 'San Marino',
        get translationName() {
            return i18n.t('countries.SanMarino');
        },
        phone_code: '378',
        lang: 'ita',
        currency: 'EUR',
        alias: 'san-marino',
        id: 200
    },
    {
        code: 'ST',
        alpha3Code: 'STP',
        name: 'Sao Tome and Principe',
        get translationName() {
            return i18n.t('countries.SaoTomeandPrincipe');
        },
        phone_code: '239',
        lang: '',
        currency: 'STD',
        alias: 'sao-tome-and-principe',
        id: 201
    },
    {
        code: 'SA',
        alpha3Code: 'SAU',
        name: 'Saudi Arabia',
        get translationName() {
            return i18n.t('countries.SaudiArabia');
        },
        phone_code: '966',
        lang: '',
        currency: 'SAR',
        alias: 'saudi-arabia',
        id: 202
    },
    {
        code: 'SN',
        alpha3Code: 'SEN',
        name: 'Senegal',
        get translationName() {
            return i18n.t('countries.Senegal');
        },
        phone_code: '221',
        lang: '',
        currency: 'XOF',
        alias: 'senegal',
        id: 203
    },
    {
        code: 'RS',
        alpha3Code: 'SRB',
        name: 'Serbia',
        get translationName() {
            return i18n.t('countries.Serbia');
        },
        phone_code: '381',
        lang: '',
        currency: 'RSD',
        alias: 'serbia',
        id: 204
    },
    {
        code: 'SC',
        alpha3Code: 'SYC',
        name: 'Seychelles',
        get translationName() {
            return i18n.t('countries.Seychelles');
        },
        phone_code: '248',
        lang: '',
        currency: 'SCR',
        alias: 'seychelles',
        id: 205
    },
    {
        code: 'SL',
        alpha3Code: 'SLE',
        name: 'Sierra Leone',
        get translationName() {
            return i18n.t('countries.SierraLeone');
        },
        phone_code: '232',
        lang: '',
        currency: 'SLL',
        alias: 'sierra-leone',
        id: 206
    },
    {
        code: 'SG',
        alpha3Code: 'SGP',
        name: 'Singapore',
        get translationName() {
            return i18n.t('countries.Singapore');
        },
        phone_code: '65',
        lang: '',
        currency: 'SGD',
        alias: 'singapore',
        id: 207
    },
    {
        code: 'SX',
        alpha3Code: 'SXM',
        name: 'Sint Maarten (Netherlands)',
        get translationName() {
            return i18n.t('countries.SintMaartenNetherlands');
        },
        phone_code: '1 721',
        lang: '',
        currency: '',
        alias: 'sint-maarten',
        id: 208
    },
    {
        code: 'SK',
        alpha3Code: 'SVK',
        name: 'Slovakia',
        get translationName() {
            return i18n.t('countries.Slovakia');
        },
        phone_code: '421',
        lang: '',
        currency: 'EUR',
        alias: 'slovakia',
        id: 209
    },
    {
        code: 'SI',
        alpha3Code: 'SVN',
        name: 'Slovenia',
        get translationName() {
            return i18n.t('countries.Slovenia');
        },
        phone_code: '386',
        lang: '',
        currency: 'EUR',
        alias: 'slovenia',
        id: 210
    },
    {
        code: 'SB',
        alpha3Code: 'SLB',
        name: 'Solomon Islands',
        get translationName() {
            return i18n.t('countries.SolomonIslands');
        },
        phone_code: '677',
        lang: '',
        currency: 'SBD',
        alias: 'solomon-islands',
        id: 211
    },
    {
        code: 'SO',
        alpha3Code: 'SOM',
        name: 'Somalia',
        get translationName() {
            return i18n.t('countries.Somalia');
        },
        phone_code: '252',
        lang: '',
        currency: 'SOS',
        alias: 'somalia',
        id: 212
    },
    {
        code: 'ZA',
        alpha3Code: 'ZAF',
        name: 'South Africa',
        get translationName() {
            return i18n.t('countries.SouthAfrica');
        },
        phone_code: '27',
        lang: '',
        currency: 'ZAR',
        alias: 'south-africa',
        id: 213
    },
    {
        code: 'GS',
        alpha3Code: 'SGS',
        name: 'South Georgia and the South Sandwich Islands',
        get translationName() {
            return i18n.t('countries.SouthGeorgiaandtheSouthSandwichIslands');
        },
        phone_code: '500',
        lang: '',
        currency: '',
        alias: 'south-georgia-and-the-south-sandwich-islands',
        id: 214
    },
    {
        code: 'ES',
        alpha3Code: 'ESP',
        name: 'Spain',
        get translationName() {
            return i18n.t('countries.Spain');
        },
        phone_code: '34',
        lang: 'spa',
        currency: 'EUR',
        alias: 'spain',
        id: 215
    },
    {
        code: 'LK',
        alpha3Code: 'LKA',
        name: 'Sri Lanka',
        get translationName() {
            return i18n.t('countries.SriLanka');
        },
        phone_code: '94',
        lang: '',
        currency: 'LKR',
        alias: 'sri-lanka',
        id: 216
    },
    {
        code: 'SD',
        alpha3Code: 'SDN',
        name: 'Sudan',
        get translationName() {
            return i18n.t('countries.Sudan');
        },
        phone_code: '249',
        lang: '',
        currency: 'SDG',
        alias: 'sudan',
        id: 217
    },
    {
        code: 'SR',
        alpha3Code: 'SUR',
        name: 'Suriname',
        get translationName() {
            return i18n.t('countries.Suriname');
        },
        phone_code: '597',
        lang: '',
        currency: 'SRD',
        alias: 'suriname',
        id: 218
    },
    {
        code: 'SJ',
        alpha3Code: 'SJM',
        name: 'Svalbard and Jan Mayen',
        get translationName() {
            return i18n.t('countries.SvalbardandJanMayen');
        },
        phone_code: '47',
        lang: '',
        currency: 'NOK',
        alias: 'svalbard_and_jan_mayen',
        id: 219
    },
    {
        code: 'SZ',
        name: 'Swaziland',
        alpha3Code: 'SWZ',
        get translationName() {
            return i18n.t('countries.Swaziland');
        },
        phone_code: '268',
        lang: '',
        currency: 'SZL',
        alias: 'swaziland',
        id: 220
    },
    {
        code: 'SE',
        alpha3Code: 'SWE',
        name: 'Sweden',
        get translationName() {
            return i18n.t('countries.Sweden');
        },
        phone_code: '46',
        lang: 'swe',
        currency: 'SEK',
        alias: 'sweden',
        id: 221
    },
    {
        code: 'CH',
        alpha3Code: 'CHE',
        name: 'Switzerland',
        get translationName() {
            return i18n.t('countries.Switzerland');
        },
        phone_code: '41',
        lang: 'fre',
        currency: 'CHF',
        alias: 'switzerland',
        id: 222
    },
    {
        code: 'SY',
        alpha3Code: 'SYR',
        name: 'Syria',
        get translationName() {
            return i18n.t('countries.Syria');
        },
        phone_code: '963',
        lang: '',
        currency: 'SYP',
        alias: 'syria',
        id: 223
    },
    {
        code: 'TW',
        alpha3Code: 'TWN',
        name: 'Taiwan',
        get translationName() {
            return i18n.t('countries.Taiwan');
        },
        phone_code: '886',
        lang: '',
        currency: 'TWD',
        alias: 'taiwan',
        id: 224
    },
    {
        code: 'TJ',
        alpha3Code: 'TJK',
        name: 'Tajikistan',
        get translationName() {
            return i18n.t('countries.Tajikistan');
        },
        phone_code: '992',
        lang: 'rus',
        currency: 'TJS',
        alias: 'tajikistan',
        id: 225
    },
    {
        code: 'TZ',
        alpha3Code: 'TZA',
        name: 'Tanzania',
        get translationName() {
            return i18n.t('countries.Tanzania');
        },
        phone_code: '255',
        lang: '',
        currency: 'TZS',
        alias: 'united-republic-of-tanzania',
        id: 226
    },
    {
        code: 'TH',
        alpha3Code: 'THA',
        name: 'Thailand',
        get translationName() {
            return i18n.t('countries.Thailand');
        },
        phone_code: '66',
        lang: '',
        currency: 'THB',
        alias: 'thailand',
        id: 227
    },
    {
        code: 'TL',
        alpha3Code: 'TLS',
        name: 'Timor-Leste',
        get translationName() {
            return i18n.t('countries.TimorLeste');
        },
        phone_code: '670',
        lang: '',
        currency: '',
        alias: 'timor-leste',
        id: 228
    },
    {
        code: 'TG',
        alpha3Code: 'TGO',
        name: 'Togo',
        get translationName() {
            return i18n.t('countries.Togo');
        },
        phone_code: '228',
        lang: '',
        currency: 'XOF',
        alias: 'togo',
        id: 229
    },
    {
        code: 'TK',
        alpha3Code: 'TKL',
        name: 'Tokelau',
        get translationName() {
            return i18n.t('countries.Tokelau');
        },
        phone_code: '690',
        lang: '',
        currency: 'NZD',
        alias: 'tokelau',
        id: 230
    },
    {
        code: 'TO',
        alpha3Code: 'TON',
        name: 'Tonga',
        get translationName() {
            return i18n.t('countries.Tonga');
        },
        phone_code: '676',
        lang: '',
        currency: 'TOP',
        alias: 'tonga',
        id: 231
    },
    {
        code: 'TT',
        alpha3Code: 'TTO',
        name: 'Trinidad and Tobago',
        get translationName() {
            return i18n.t('countries.TrinidadandTobago');
        },
        phone_code: '1 868',
        lang: '',
        currency: 'TTD',
        alias: 'trinidad-and-tobago',
        id: 232
    },
    {
        code: 'TN',
        alpha3Code: 'TUN',
        name: 'Tunisia',
        get translationName() {
            return i18n.t('countries.Tunisia');
        },
        phone_code: '216',
        lang: '',
        currency: 'TND',
        alias: 'tunisia',
        id: 233
    },
    {
        code: 'TR',
        alpha3Code: 'TUR',
        name: 'Turkey',
        get translationName() {
            return i18n.t('countries.Turkey');
        },
        phone_code: '90',
        lang: '',
        currency: 'TRY',
        alias: 'turkey',
        id: 234
    },
    {
        code: 'TM',
        alpha3Code: 'TKM',
        name: 'Turkmenistan',
        get translationName() {
            return i18n.t('countries.Turkmenistan');
        },
        phone_code: '993',
        lang: 'tur',
        currency: 'TMT',
        alias: 'turkmenistan',
        id: 235
    },
    {
        code: 'TC',
        alpha3Code: 'TCA',
        name: 'Turks and Caicos Islands',
        get translationName() {
            return i18n.t('countries.TurksandCaicosIslands');
        },
        phone_code: '1 649',
        lang: '',
        currency: 'USD',
        alias: 'turks-and-caicos',
        id: 236
    },
    {
        code: 'TV',
        alpha3Code: 'TUV',
        name: 'Tuvalu',
        get translationName() {
            return i18n.t('countries.Tuvalu');
        },
        phone_code: '688',
        lang: '',
        currency: 'AUD',
        alias: 'tuvalu',
        id: 237
    },
    {
        code: 'UG',
        alpha3Code: 'UGA',
        name: 'Uganda',
        get translationName() {
            return i18n.t('countries.Uganda');
        },
        phone_code: '256',
        lang: '',
        currency: 'UGX',
        alias: 'uganda',
        id: 238
    },
    {
        code: 'UA',
        alpha3Code: 'UKR',
        name: 'Ukraine',
        get translationName() {
            return i18n.t('countries.Ukraine');
        },
        phone_code: '380',
        lang: 'ukr',
        currency: 'UAH',
        alias: 'ukraine',
        id: 239
    },
    {
        code: 'AE',
        alpha3Code: 'ARE',
        name: 'United Arab Emirates',
        get translationName() {
            return i18n.t('countries.UnitedArabEmirates');
        },
        phone_code: '971',
        lang: '',
        currency: 'AED',
        alias: 'united-arab-emirates',
        id: 240
    },
    {
        code: 'GB',
        alpha3Code: 'GBR',
        name: 'United Kingdom',
        get translationName() {
            return i18n.t('countries.UnitedKingdom');
        },
        phone_code: '44',
        lang: '',
        currency: 'GBP',
        alias: 'united-kingdom',
        id: 241
    },
    {
        code: 'US',
        alpha3Code: 'USA',
        name: 'United States',
        get translationName() {
            return i18n.t('countries.UnitedStates');
        },
        phone_code: '1',
        lang: '',
        currency: 'USD',
        alias: 'usa',
        id: 242
    },
    {
        code: 'UM',
        alpha3Code: 'UMI',
        name: 'United States Minor Outlying Islands',
        get translationName() {
            return i18n.t('countries.UnitedStatesMinorOutlyingIslands');
        },
        phone_code: '',
        lang: '',
        currency: 'USD',
        alias: 'united-states-minor-outlying-islands',
        id: 243
    },
    {
        code: 'UY',
        alpha3Code: 'URY',
        name: 'Uruguay',
        get translationName() {
            return i18n.t('countries.Uruguay');
        },
        phone_code: '598',
        lang: 'spa',
        currency: 'UYU',
        alias: 'uruguay',
        id: 244
    },
    {
        code: 'UZ',
        alpha3Code: 'UZB',
        name: 'Uzbekistan',
        get translationName() {
            return i18n.t('countries.Uzbekistan');
        },
        phone_code: '998',
        lang: 'rus',
        currency: 'UZS',
        alias: 'uzbekistan',
        id: 245
    },
    {
        code: 'VU',
        alpha3Code: 'VUT',
        name: 'Vanuatu',
        get translationName() {
            return i18n.t('countries.Vanuatu');
        },
        phone_code: '678',
        lang: '',
        currency: 'VUV',
        alias: 'vanuatu',
        id: 246
    },
    {
        code: 'VE',
        alpha3Code: 'VEN',
        name: 'Venezuela',
        get translationName() {
            return i18n.t('countries.Venezuela');
        },
        phone_code: '58',
        lang: 'spa',
        currency: 'VES',
        alias: 'venezuela',
        id: 247
    },
    {
        code: 'VN',
        alpha3Code: 'VNM',
        name: 'Vietnam',
        get translationName() {
            return i18n.t('countries.Vietnam');
        },
        phone_code: '84',
        lang: '',
        currency: 'VND',
        alias: 'vietnam',
        id: 248
    },
    {
        code: 'VG',
        name: 'Virgin Islands, British',
        alpha3Code: 'VGB',
        get translationName() {
            return i18n.t('countries.VirginIslandsBritish');
        },
        phone_code: '1',
        lang: '',
        currency: 'USD',
        alias: 'british-virgin-islands',
        id: 249
    },
    {
        code: 'VI',
        alpha3Code: 'VIR',
        name: 'Virgin Islands, U.S.',
        get translationName() {
            return i18n.t('countries.VirginIslandsUS');
        },
        phone_code: '1',
        lang: '',
        currency: 'USD',
        alias: 'virgin-islands',
        id: 250
    },
    {
        code: 'WF',
        alpha3Code: 'WLF',
        name: 'Wallis and Futuna',
        get translationName() {
            return i18n.t('countries.WallisandFutuna');
        },
        phone_code: '681',
        lang: '',
        currency: 'XPF',
        alias: 'wallis-and-futuna',
        id: 251
    },
    {
        code: 'EH',
        alpha3Code: 'ESH',
        name: 'Western Sahara',
        get translationName() {
            return i18n.t('countries.WesternSahara');
        },
        phone_code: '212',
        lang: '',
        currency: 'MAD',
        alias: 'western-sahara',
        id: 252
    },
    {
        code: 'YE',
        alpha3Code: 'YEM',
        name: 'Yemen',
        get translationName() {
            return i18n.t('countries.Yemen');
        },
        phone_code: '967',
        lang: '',
        currency: 'YER',
        alias: 'yemen',
        id: 253
    },
    {
        code: 'ZM',
        alpha3Code: 'ZMB',
        name: 'Zambia',
        get translationName() {
            return i18n.t('countries.Zambia');
        },
        phone_code: '260',
        lang: '',
        currency: 'ZMW',
        alias: 'zambia',
        id: 254
    },
    {
        code: 'ZW',
        alpha3Code: 'ZWE',
        name: 'Zimbabwe',
        get translationName() {
            return i18n.t('countries.Zimbabwe');
        },
        phone_code: '263',
        lang: '',
        currency: 'ZWD',
        alias: 'zimbabwe',
        id: 255
    },
    {
        code: 'GB',
        alpha3Code: 'GBR',
        name: 'England',
        get translationName() {
            return i18n.t('countries.England');
        },
        phone_code: '44',
        lang: '',
        currency: 'GBP',
        alias: 'england',
        id: 257
    },
    {
        code: 'XI',
        alpha3Code: '',
        name: 'Northern Ireland',
        get translationName() {
            return i18n.t('countries.NorthernIreland');
        },
        phone_code: '',
        lang: '',
        currency: '',
        alias: 'northern-ireland',
        id: 258
    },
    {
        code: 'GB',
        alpha3Code: 'GBR',
        name: 'Scotland',
        get translationName() {
            return i18n.t('countries.Scotland');
        },
        phone_code: '44',
        lang: '',
        currency: 'GBP',
        alias: 'scotland',
        id: 259
    },
    {
        code: 'GB',
        alpha3Code: 'GBR',
        name: 'Wales',
        get translationName() {
            return i18n.t('countries.Wales');
        },
        phone_code: '44',
        lang: '',
        currency: 'GBP',
        alias: 'wales',
        id: 260
    },
    {
        code: 'GB',
        alpha3Code: 'GBR',
        name: 'Great Britain',
        get translationName() {
            return i18n.t('countries.GreatBritain');
        },
        phone_code: '44',
        lang: '',
        currency: 'GBP',
        alias: 'great-britain',
        id: 1636
    },
    {
        code: 'SS',
        alpha3Code: 'SSD',
        name: 'South Sudan',
        get translationName() {
            return i18n.t('countries.SouthSudan');
        },
        phone_code: '211',
        lang: '',
        currency: 'SSP',
        alias: 'south-sudan',
        id: 1637
    },
    {
        code: 'CS',
        alpha3Code: 'CSK',
        name: 'Czechoslovakia',
        get translationName() {
            return i18n.t('countries.Czechoslovakia');
        },
        phone_code: '42',
        lang: '',
        currency: 'CZK',
        alias: 'czechoslovakia',
        id: 1638
    },
    {
        code: 'SU',
        alpha3Code: 'SUN',
        name: 'USSR',
        get translationName() {
            return i18n.t('countries.USSR');
        },
        phone_code: '',
        lang: '',
        currency: '',
        alias: 'ussr',
        id: 1639
    },
    {
        code: 'YU',
        alpha3Code: 'YUG',
        name: 'Yugoslavia',
        get translationName() {
            return i18n.t('countries.Yugoslavia');
        },
        phone_code: '',
        lang: '',
        currency: '',
        alias: 'yugoslavia',
        id: 1640
    },
    {
        code: 'XK',
        alpha3Code: 'XKX',
        name: 'Kosovo',
        get translationName() {
            return i18n.t('countries.Kosovo');
        },
        phone_code: '383',
        lang: '',
        currency: '',
        alias: 'kosovo',
        id: 1647
    },
    {
        code: 'XC',
        alpha3Code: '',
        name: 'Turkish Republic of Northern Cyprus',
        get translationName() {
            return i18n.t('countries.TurkishRepublicofNorthernCyprus');
        },
        phone_code: '',
        lang: '',
        currency: '',
        alias: 'turkish-republic-of-northern-cyprus',
        id: 1652
    },
    {
        code: 'XC',
        alpha3Code: 'GEO',
        name: 'South Ossetia',
        get translationName() {
            return i18n.t('countries.SouthOssetia');
        },
        phone_code: '995',
        lang: '',
        currency: 'GEL',
        alias: 'south-ossetia',
        id: 2237
    }
];

export default function Home() {

    return (
        <>
            <Select
                showSearch
                filterOption={(input, option) => {
                    const value =
                        option?.children?.props?.children[1]?.props?.children ?? '';

                    return (
                        value.toLowerCase().includes(input.toLowerCase()) ||
                        ((option?.value ?? '') as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    );
                }}
                getPopupContainer={(triggerNode: HTMLElement) =>
                    triggerNode.parentElement as HTMLElement
                }
            >
                {CountryCodes.map(country => (
                    <Option
                        key={country.alias}
                        value={country.alias}
                        className="options_country"
                        data-testid={'countyCode-option'}
                    >
                        <div
                            className="countyCode"
                            title={country.name}
                        >
                            <div dir="ltr" className="phoneCode">
                                {country.name}
                            </div>
                        </div>
                    </Option>
                ))}
            </Select>
        </>
    )
}