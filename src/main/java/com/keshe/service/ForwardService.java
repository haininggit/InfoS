package com.keshe.service;

import com.keshe.entity.Forward;
import com.keshe.entity.RetJsonData;

/**
 * @InterfaceName ForwardService
 * @Description TODO
 * @Author Haining
 * @Date 2020/5/27 9:37
 * @Version 1.0
 */
public interface ForwardService {
    RetJsonData forward(Forward forward);
}
