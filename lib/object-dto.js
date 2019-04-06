/**
 * Name: object-dto
 *
 * Description: Inspired by POJO's and DTO's from Java which help make code
 *              more readable.
 *              Converts request data to JavaScript objects and vice versa.
 *              Also supports mapping objects to desired DTO's.
 *
 * Author: Vernon Liu
 * Github: mrvernonliu
 */

'use strict';

/**
 * Converts user request values to Entity object if possible,
 * otherwise returns null.
 *
 * example usage:
 *      let user = objectDTO.getEntity(data, new User);
 *
 * @param req       - request from the user
 * @param entity    - new Entity (ie. new User());
 *
 * @return new Object of desired type or null
 */
const getEntity = (req, entity) => {
    let keys = Object.keys(entity);

    // Check if the request has all the required keys.
    let validated = true;
    keys.forEach((key) => {
        if (!req.data[key]) {
            console.log(`ERROR: could not deserialize ${entity.constructor.name} due to the invalid key: ${key}`);
            validated = false;
        }
    });
    if (!validated) return null;

    // Create a new object from the type of obj and populate keys
    let deserializedObject = Object.create(entity);
    keys.forEach((key) => {
        deserializedObject[key] = req.data[key];
    });
    return deserializedObject;
};

/**
 * Returns a serialized json object with all of the object's keys
 *
 * example usage:
 *      res.send(objectDTO.serialize(user);
 *
 * @param obj       - Object to be converted to JSON
 * @return JSON convertible object
 */
const serialize = (obj) => {
    let keys = Object.keys(obj);
    let result = {};
    keys.forEach((key) => {
        result[key] = obj[key];
    });
    return result;
};

/**
 * Returns a DTO object mapped from the original object
 *
 * example usage:
 *      let userDTO = objectDTO.mapToDTO(user, new UserDTO);
 *
 * @param obj         - Object to be mapped to a DTO
 * @param entity      - An instance of the desired return DTO
 *
 * @return new DTO object mapped from object
 */
const mapToDTO = (obj, entity)  => {
    let keys = Object.keys(entity);
    let objectDTO = Object.create(entity);

    keys.forEach( (key) => {
        objectDTO[key] = obj[key];
    });
    return objectDTO;
};


module.exports = {
    getEntity: getEntity,
    serialize: serialize,
    mapToDTO: mapToDTO
}