import { Ref, ref, unref } from 'vue';

export const useRect = (element: Element | Ref<Element>) => {
    return unref(element)?.getBoundingClientRect();
};

export const useHeight = (element: Element | Ref<Element>) => {
    let height = ref();

    height.value = useRect(element)?.height || 0;

    return height;
}