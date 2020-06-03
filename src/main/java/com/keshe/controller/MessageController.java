package com.keshe.controller;

import com.keshe.entity.Img;
import com.keshe.entity.Message;
import com.keshe.entity.RetJsonData;
import com.keshe.mapper.ImgMapper;
import com.keshe.service.ImgService;
import com.keshe.service.MessageService;
import com.keshe.tools.Pack;
import com.keshe.tools.QiniuUpload;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.soap.SAAJResult;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.RecursiveTask;

/**
 * @Description TODO
 * @Author gyhdx
 * @Date 2020/5/27 10:04
 */
@RestController
@RequestMapping("/message")
public class MessageController {

    @Resource
    private MessageService messageService;

    /**
     * 删除动态（个人页面）
     *  成功：返回   success:true
     *               errorMsg:NULL
     *               data:删除成功
     *  失败：返回   success:false
     *               errorMsg:删除失败/该动态不存在
     *               data:null
     * @param messageId
     * @return
     */
    @RequestMapping("/delPersonalMessage")
    @ResponseBody
    public RetJsonData delPersonalMessage(String messageId){
        return messageService.delPersonalMessage(messageId);
    }


    /**
     * 发表动态（包含图片）
     *  成功：返回   success:true
     *               errorMsg:NULL
     *               data:发表成功
     *  失败：返回   success:false
     *               errorMsg:存储图片错误/动态查找失败/动态存储失败
     *               data:null
     * @param files
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/saveMessageOnImg")
    public RetJsonData saveMessageOnImg(MultipartFile[] files, HttpServletRequest request) throws Exception {
        String userId = request.getParameter("userId");
        String lable = request.getParameter("lable");
        String messageInfo = request.getParameter("messageInfo");
        return messageService.saveMessageOnImg(files, userId, messageInfo, lable);
    }


    /**
     * 发表动态（包含图片）
     *  成功：返回   success:true
     *               errorMsg:NULL
     *               data:发表成功
     *  失败：返回   success:false
     *               errorMsg:视频存储失败/动态查找失败/动态存储失败
     *               data:null
     * @param file
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/saveMessageOnVideo")
    @ResponseBody
    public RetJsonData saveMessageOnVideo(MultipartFile file, HttpServletRequest request) throws Exception {
        String userId = request.getParameter("userId");
        String lable = request.getParameter("lable");
        String messageInfo = request.getParameter("messageInfo");
        return messageService.saveMessageOnVideo(file, userId, messageInfo, lable);
    }


    /**
     *
     * @param userId
     * @return
     */
    @RequestMapping("/messageInfoPage")
    @ResponseBody
    public RetJsonData messageInfoPage(String userId){
        return messageService.messageInfoPage(userId);
    }


}
