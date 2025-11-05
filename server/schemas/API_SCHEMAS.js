userSchema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string", // up to 255 chars
            "minLength": 5,
            "maxLength": 255,
            "format": "email"
        },
        "password": { //8 - 64 chars
            "type": "string",
            "minLength": 8,
            "maxLength": 64
        }
    },
    "required": ["email", "password"]
}

tableSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 32
        },
        "color": {
            "type": "string",
            "minLength": 7,
            "maxLength": 7,
            "pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$" //regex credit to 'Joey' https://stackoverflow.com/questions/1636350/how-to-identify-a-given-string-is-hex-color-format
        }
    }
}

entrySchema = {
    "type": "object",
    "properties": {
        "company": {
            "type": "string",
            "minLength": 1,
            "maxLength": 32
        },
        "title": {
            "type": "string",
            "minLength": 1,
            "maxLength": 32
        },
        "application_open": {
            "type": "string",
            "minLength": 10,
            "maxLength": 10,
            "pattern": "^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$"
        },
        "application_close": {
            "type": "string",
            "minLength": 10,
            "maxLength": 10,
            "pattern": "^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$"
        },
        "application_date": {
            "type": "string",
            "minLength": 10,
            "maxLength": 10,
            "pattern": "^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$"
        },
        "status": {
            "type": "string",
            "enum": ["Unavailable", "Not applied", "Applied", "Rejected", "Accepted", "In-progress"]
        },
        "preference": {
            "type": "string",
            "enum": ["Perfect", "Great", "Good", "Ok", "Unfavorable", "Bad", "Terrible"]
        },
        "notes": {
            "type": "string",
            "minLength": 0,
            "maxLength": 6000
        }
    }
}

module.exports = {userSchema, tableSchema, entrySchema}