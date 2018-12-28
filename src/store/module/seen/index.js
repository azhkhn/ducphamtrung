import seen, {SET_HOTELSEEN} from './seen';

export const SeenNamespace = 'seen';

export const SeenMutationTypes = {
    SET_HOTELSEEN: `${SeenMutationTypes}/${SET_HOTELSEEN}`,
};

export default seen;
