/* tslint:disable */
import {GraphQLResolveInfo, GraphQLScalarType} from 'graphql';

/**
 * This file is auto-generated by graphql-schema-typescript
 * Please note that any changes in this file may be overwritten
 */
 

/*******************************
 *                             *
 *          TYPE DEFS          *
 *                             *
 *******************************/
export interface GQLQuery {
    a?: string;
}

export interface GQLMutation {
    registerApp?: GQLAppToken;
  registerUser?: boolean;
    sendUserLocation?: GQLLocationInformation;
    sendEvent?: boolean;
}

export interface GQLAppToken {
    token?: string;
}

export interface GQLUserMetadataInput {
    fullName?: string;
  gender?: GQLGender;
  dateOfBirth?: GQLDate;
    address?: GQLAddressInput;
  medicalInformation?: GQLMedicalInformationInput;
}

export enum GQLGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export type GQLDate = any;

export interface GQLAddressInput {
  state: string;
  city: string;
  street: string;
  apartment: string;
}

export interface GQLMedicalInformationInput {
    blabla?: string;
}

export interface GQLLocationInput {
    lat: number;
    long: number;
}

export interface GQLLocationInformation {
    geocodedAddress?: string;
    crowdednessLevel?: string;
    pointsOfInterests?: Array<string | null>;
    weather?: string;
}

export enum GQLLogType {
    STARTED = 'STARTED',
    STOPPED = 'STOPPED'
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface GQLResolver {
  Query?: GQLQueryTypeResolver;
  Mutation?: GQLMutationTypeResolver;
    AppToken?: GQLAppTokenTypeResolver;
    Date?: GraphQLScalarType;
    LocationInformation?: GQLLocationInformationTypeResolver;
}
export interface GQLQueryTypeResolver<TParent = any> {
    a?: QueryToAResolver<TParent>;
}

export interface QueryToAResolver<TParent = any, TResult = any> {
    (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLMutationTypeResolver<TParent = any> {
    registerApp?: MutationToRegisterAppResolver<TParent>;
    registerUser?: MutationToRegisterUserResolver<TParent>;
    sendUserLocation?: MutationToSendUserLocationResolver<TParent>;
    sendEvent?: MutationToSendEventResolver<TParent>;
}

export interface MutationToRegisterAppArgs {
    appName?: string;
}
export interface MutationToRegisterAppResolver<TParent = any, TResult = any> {
    (parent: TParent, args: MutationToRegisterAppArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToRegisterUserArgs {
    userEmail?: string;
    appToken?: string;
    clockSerial?: string;
    userMetadata?: GQLUserMetadataInput;
}
export interface MutationToRegisterUserResolver<TParent = any, TResult = any> {
    (parent: TParent, args: MutationToRegisterUserArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToSendUserLocationArgs {
    userEmail?: string;
    appToken?: string;
    location?: GQLLocationInput;
}
export interface MutationToSendUserLocationResolver<TParent = any, TResult = any> {
    (parent: TParent, args: MutationToSendUserLocationArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToSendEventArgs {
    userEmail?: string;
    appToken?: string;
    location?: GQLLocationInput;
    eventDescription?: string;
    logType?: GQLLogType;
}
export interface MutationToSendEventResolver<TParent = any, TResult = any> {
    (parent: TParent, args: MutationToSendEventArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLAppTokenTypeResolver<TParent = any> {
    token?: AppTokenToTokenResolver<TParent>;
}

export interface AppTokenToTokenResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLLocationInformationTypeResolver<TParent = any> {
    geocodedAddress?: LocationInformationToGeocodedAddressResolver<TParent>;
    crowdednessLevel?: LocationInformationToCrowdednessLevelResolver<TParent>;
    pointsOfInterests?: LocationInformationToPointsOfInterestsResolver<TParent>;
    weather?: LocationInformationToWeatherResolver<TParent>;
}

export interface LocationInformationToGeocodedAddressResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LocationInformationToCrowdednessLevelResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LocationInformationToPointsOfInterestsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LocationInformationToWeatherResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}
