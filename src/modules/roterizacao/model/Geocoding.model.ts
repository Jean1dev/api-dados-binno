export interface IGeocoding {
    type:       string;
    features:   Feature[];
    properties: IProperties;
    _id:        ID;
}

export interface ID {
    _bsontype: string;
    id:        IDClass;
}

export interface IDClass {
    type: string;
    data: number[];
}

export interface Feature {
    type:       string;
    properties: FeatureProperties;
    geometry:   Geometry;
}

export interface Geometry {
    coordinates: Array<Array<number[]>>;
    type:        string;
}

export interface FeatureProperties {
    time:      number;
    waypoints: Waypoint[];
    mode:      string;
    legs:      Leg[];
    distance:  number;
}

export interface Leg {
    time:     number;
    steps:    Step[];
    distance: number;
}

export interface Step {
    time:        number;
    distance:    number;
    to_index:    number;
    instruction: Instruction;
    from_index:  number;
}

export interface Instruction {
    text: string;
}

export interface Waypoint {
    location:       number[];
    original_index: number;
}

export interface IProperties {
    waypoints: Array<number[]>;
    mode:      string;
}

export class GeocodingConverter {
    public static toGeocodingJson(json: string): IGeocoding {
        return cast(JSON.parse(json), r("IGeocoding"));
    }

    public static geocodingToJson(value: IGeocoding): string {
        return JSON.stringify(uncast(value, r("IGeocoding")), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(typ: any, val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(typ, val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "IGeocoding": o([
        { json: "type", js: "type", typ: "" },
        { json: "features", js: "features", typ: a(r("Feature")) },
        { json: "properties", js: "properties", typ: r("IProperties") },
        { json: "_id", js: "_id", typ: r("ID") },
    ], false),
    "ID": o([
        { json: "_bsontype", js: "_bsontype", typ: "" },
        { json: "id", js: "id", typ: r("IDClass") },
    ], false),
    "IDClass": o([
        { json: "type", js: "type", typ: "" },
        { json: "data", js: "data", typ: a(0) },
    ], false),
    "Feature": o([
        { json: "type", js: "type", typ: "" },
        { json: "properties", js: "properties", typ: r("FeatureProperties") },
        { json: "geometry", js: "geometry", typ: r("Geometry") },
    ], false),
    "Geometry": o([
        { json: "coordinates", js: "coordinates", typ: a(a(a(3.14))) },
        { json: "type", js: "type", typ: "" },
    ], false),
    "FeatureProperties": o([
        { json: "time", js: "time", typ: 0 },
        { json: "waypoints", js: "waypoints", typ: a(r("Waypoint")) },
        { json: "mode", js: "mode", typ: "" },
        { json: "legs", js: "legs", typ: a(r("Leg")) },
        { json: "distance", js: "distance", typ: 0 },
    ], false),
    "Leg": o([
        { json: "time", js: "time", typ: 0 },
        { json: "steps", js: "steps", typ: a(r("Step")) },
        { json: "distance", js: "distance", typ: 0 },
    ], false),
    "Step": o([
        { json: "time", js: "time", typ: 0 },
        { json: "distance", js: "distance", typ: 0 },
        { json: "to_index", js: "to_index", typ: 0 },
        { json: "instruction", js: "instruction", typ: r("Instruction") },
        { json: "from_index", js: "from_index", typ: 0 },
    ], false),
    "Instruction": o([
        { json: "text", js: "text", typ: "" },
    ], false),
    "Waypoint": o([
        { json: "location", js: "location", typ: a(3.14) },
        { json: "original_index", js: "original_index", typ: 0 },
    ], false),
    "IProperties": o([
        { json: "waypoints", js: "waypoints", typ: a(a(3.14)) },
        { json: "mode", js: "mode", typ: "" },
    ], false),
};
