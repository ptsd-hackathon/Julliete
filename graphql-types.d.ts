/* tslint:disable */
import { GraphQLResolveInfo, GraphQLScalarType } from 'graphql';
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
  getUserEvents?: Array<GQLUserEvent | null>;
  authUser?: boolean;
}

export type GQLDateTime = any;

export interface GQLUserEvent {
  userEmail?: string;
  appToken?: string;
  eventDescription?: string;
  logType?: string;
  location?: GQLLocationInformation;
  medicalStats?: Array<GQLMedicalStats | null>;
  timestamp?: GQLDateTime;
}

export interface GQLLocationInformation {
  geocodedAddress?: string;
  crowdednessLevel?: number;
  pointsOfInterests?: Array<string | null>;
  weather?: GQLWeather;
  coordinates?: GQLCoordinates;
}

export interface GQLWeather {
  description?: string;
  temperature?: string;
}

export interface GQLCoordinates {
  lat?: number;
  long?: number;
}

export interface GQLMedicalStats {
  breathRate?: number;
  protocolNumber?: number;
  systolicBloodPressure?: number;
  strokeVolume?: number;
  spo2?: number;
  movement?: number;
  cardiacIndex?: number;
  heartbeatRateVariance?: number;
  heartbeatRate?: number;
  MAPrs?: number;
  svr?: number;
  cardiacOutput?: number;
  battery?: number;
  diastolicBloodPressure?: number;
  temperature?: number;
  sweat?: number;
  caloris?: number;
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
  dateOfBirth?: GQLDateTime;
  address?: GQLAddressInput;
  medicalInformation?: GQLMedicalInformationInput;
}

export enum GQLGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

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

export enum GQLLogType {
  STARTED = 'STARTED',
  STOPPED = 'STOPPED',
  REPEATABLE = 'REPEATABLE'
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
  DateTime?: GraphQLScalarType;
  UserEvent?: GQLUserEventTypeResolver;
  LocationInformation?: GQLLocationInformationTypeResolver;
  Weather?: GQLWeatherTypeResolver;
  Coordinates?: GQLCoordinatesTypeResolver;
  MedicalStats?: GQLMedicalStatsTypeResolver;
  Mutation?: GQLMutationTypeResolver;
  AppToken?: GQLAppTokenTypeResolver;
}
export interface GQLQueryTypeResolver<TParent = any> {
  getUserEvents?: QueryToGetUserEventsResolver<TParent>;
  authUser?: QueryToAuthUserResolver<TParent>;
}

export interface QueryToGetUserEventsArgs {
  userEmail?: string;
  appToken?: string;
  fromDate?: GQLDateTime;
  toDate?: GQLDateTime;
}
export interface QueryToGetUserEventsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: QueryToGetUserEventsArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface QueryToAuthUserArgs {
  userEmail?: string;
  appToken?: string;
}
export interface QueryToAuthUserResolver<TParent = any, TResult = any> {
  (parent: TParent, args: QueryToAuthUserArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLUserEventTypeResolver<TParent = any> {
  userEmail?: UserEventToUserEmailResolver<TParent>;
  appToken?: UserEventToAppTokenResolver<TParent>;
  eventDescription?: UserEventToEventDescriptionResolver<TParent>;
  logType?: UserEventToLogTypeResolver<TParent>;
  location?: UserEventToLocationResolver<TParent>;
  medicalStats?: UserEventToMedicalStatsResolver<TParent>;
  timestamp?: UserEventToTimestampResolver<TParent>;
}

export interface UserEventToUserEmailResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserEventToAppTokenResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserEventToEventDescriptionResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserEventToLogTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserEventToLocationResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserEventToMedicalStatsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserEventToTimestampResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLLocationInformationTypeResolver<TParent = any> {
  geocodedAddress?: LocationInformationToGeocodedAddressResolver<TParent>;
  crowdednessLevel?: LocationInformationToCrowdednessLevelResolver<TParent>;
  pointsOfInterests?: LocationInformationToPointsOfInterestsResolver<TParent>;
  weather?: LocationInformationToWeatherResolver<TParent>;
  coordinates?: LocationInformationToCoordinatesResolver<TParent>;
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

export interface LocationInformationToCoordinatesResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLWeatherTypeResolver<TParent = any> {
  description?: WeatherToDescriptionResolver<TParent>;
  temperature?: WeatherToTemperatureResolver<TParent>;
}

export interface WeatherToDescriptionResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface WeatherToTemperatureResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLCoordinatesTypeResolver<TParent = any> {
  lat?: CoordinatesToLatResolver<TParent>;
  long?: CoordinatesToLongResolver<TParent>;
}

export interface CoordinatesToLatResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface CoordinatesToLongResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface GQLMedicalStatsTypeResolver<TParent = any> {
  breathRate?: MedicalStatsToBreathRateResolver<TParent>;
  protocolNumber?: MedicalStatsToProtocolNumberResolver<TParent>;
  systolicBloodPressure?: MedicalStatsToSystolicBloodPressureResolver<TParent>;
  strokeVolume?: MedicalStatsToStrokeVolumeResolver<TParent>;
  spo2?: MedicalStatsToSpo2Resolver<TParent>;
  movement?: MedicalStatsToMovementResolver<TParent>;
  cardiacIndex?: MedicalStatsToCardiacIndexResolver<TParent>;
  heartbeatRateVariance?: MedicalStatsToHeartbeatRateVarianceResolver<TParent>;
  heartbeatRate?: MedicalStatsToHeartbeatRateResolver<TParent>;
  MAPrs?: MedicalStatsToMAPrsResolver<TParent>;
  svr?: MedicalStatsToSvrResolver<TParent>;
  cardiacOutput?: MedicalStatsToCardiacOutputResolver<TParent>;
  battery?: MedicalStatsToBatteryResolver<TParent>;
  diastolicBloodPressure?: MedicalStatsToDiastolicBloodPressureResolver<TParent>;
  temperature?: MedicalStatsToTemperatureResolver<TParent>;
  sweat?: MedicalStatsToSweatResolver<TParent>;
  caloris?: MedicalStatsToCalorisResolver<TParent>;
}

export interface MedicalStatsToBreathRateResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToProtocolNumberResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToSystolicBloodPressureResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToStrokeVolumeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToSpo2Resolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToMovementResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToCardiacIndexResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToHeartbeatRateVarianceResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToHeartbeatRateResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToMAPrsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToSvrResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToCardiacOutputResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToBatteryResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToDiastolicBloodPressureResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToTemperatureResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToSweatResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MedicalStatsToCalorisResolver<TParent = any, TResult = any> {
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
  language?: string;
  locationCoordinates?: GQLLocationInput;
}
export interface MutationToSendUserLocationResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToSendUserLocationArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToSendEventArgs {
  userEmail?: string;
  appToken?: string;
  language?: string;
  locationCoordinates?: GQLLocationInput;
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
