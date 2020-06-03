package com.keshe.service.impl;

import com.keshe.mapper.LableMapper;
import com.keshe.service.LableService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @ClassName LableServiceImpl
 * @Description TODO
 * @Author Haining
 * @Date 2020/5/27 9:48
 * @Version 1.0
 */

@Service
public class LableServiceImpl implements LableService {
    @Resource
    private LableMapper lableMapper;
}
