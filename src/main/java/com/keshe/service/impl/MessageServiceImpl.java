package com.keshe.service.impl;

import com.keshe.entity.*;
import com.keshe.mapper.*;
import com.keshe.service.MessageService;
import com.keshe.tools.Pack;
import com.keshe.tools.QiniuUpload;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.*;

/**
 * @ClassName MessageServiceImpl
 * @Description TODO
 * @Author Haining
 * @Date 2020/5/27 9:49
 * @Version 1.0
 */

@Service
public class MessageServiceImpl implements MessageService {
    @Resource
    private MessageMapper messageMapper;
    @Resource
    private ImgMapper imgMapper;
    @Resource
    private VideoMapper videoMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private RelationMapper relationMapper;
    @Resource
    private Pack pack;
    @Resource
    private QiniuUpload qiniuUpload;

    @Override
    public RetJsonData delPersonalMessage(String messageId) {
        List<Img> imgs = imgMapper.imgByMessageId(messageId);
        Video video = videoMapper.videoByMessageId(messageId);
        if (imgs.size() != 0 || video != null){
            if (messageMapper.delMessage(messageId) > 0){
                if (videoMapper.delVideoByMessageId(messageId) > 0 || imgMapper.delImgsByMessageId(messageId) > 0){
                    return new RetJsonData(true,"删除成功", null);
                }
                return new RetJsonData(false, "删除失败");
            }
            return new RetJsonData(false, "该动态不存在,删除失败");
        }else{
            if (messageMapper.delMessage(messageId) > 0){
                return new RetJsonData(true,"删除成功", null);
            }else{
                return new RetJsonData(false, "该动态不存在,删除失败");
            }
        }

    }

    @Override
    public RetJsonData messageInfoPage(String userId) {
        Integer followCount = relationMapper.relationCountByUserId(userId);
        User user = userMapper.queryUserId(userId);
        List<Message> messages = messageMapper.messageInfo();
        List<MessageAndAllInfo> messageAndImgs = new ArrayList<>();
        for (int i = 0; i < messages.size(); i++){
            MessageAndAllInfo messageAndAllInfo1 = new MessageAndAllInfo();
            List<Img> imgs = imgMapper.imgByMessageId(messages.get(i).getMessageId());
            Video video = videoMapper.videoByMessageId(messages.get(i).getMessageId());
            User user1 = userMapper.userByUserId(messages.get(i).getUserId());
            user1.setUserEmail(null);
            user1.setUserPassword(null);
            user1.setUserRealname(null);
            messageAndAllInfo1.setMessage(messages.get(i));
            messageAndAllInfo1.setUser(user1);
            messageAndAllInfo1.setImgs(imgs);
            messageAndAllInfo1.setVideo(video);
            messageAndImgs.add(messageAndAllInfo1);
        }
        user.setUserRealname(null);
        user.setUserPassword(null);
        user.setUserEmail(null);
        Map<String, Object> map = new HashMap<>();
        map.put("followCount", followCount);
        map.put("user", user);
        map.put("messages", messageAndImgs);
        if (user != null){
            return new RetJsonData(true, map, null);
        }
        return new RetJsonData(false, "查询失败");
    }


    @Override
    public RetJsonData saveMessageOnImg(MultipartFile[] files, String userId, String messageInfo, String lable) throws Exception {
        Message message = pack.packMessage(userId, messageInfo, lable);
        List<Img> imgs = new ArrayList<>();
        if (messageMapper.saveMessage(message) > 0){
            if (files.length > 0){
                String messageid = messageMapper.getMessageId(userId, messageInfo);
                if (message != null){
                    for (MultipartFile file : files) {    //遍历文件
                        //上传文件并返回url
                        String url = qiniuUpload.updateFile(file, UUID.randomUUID().toString()+".jpg");
                        //存储图片
                        Img img = pack.packImg(messageid, url);
                        if (imgMapper.saveImg(img) < 0){
                            return new RetJsonData(false, "存储图片错误");
                        }
                    }
                    return new RetJsonData(true, "发表成功");
                }
                return new RetJsonData(false, "动态查找失败");
            }
            return new RetJsonData(true, "发表成功");
        }
        return new RetJsonData(false, "动态存储失败");
    }

    @Override
    public RetJsonData saveMessageOnVideo(MultipartFile file, String userId, String messageInfo, String lable) throws Exception {
        Message message = pack.packMessage(userId, messageInfo, lable);
        List<Img> imgs = new ArrayList<>();
        if (messageMapper.saveMessage(message) > 0){
            if (file != null){
                String messageid = messageMapper.getMessageId(userId, messageInfo);
                if (message != null){
                        String url = qiniuUpload.updateFile(file, UUID.randomUUID().toString()+".mp4");
                        //存储图片
                        Video video = pack.packVideo(messageid, url);
                        if (videoMapper.saveVideo(video) > 0){
                            return new RetJsonData(true, "发表成功");
                        }
                        return new RetJsonData(false, "视频存储失败");
                    }
                    return new RetJsonData(true, "动态查找失败");
                }
                return new RetJsonData(false, "发表成功");
            }
            return new RetJsonData(true, "动态存储失败");
    }


}
